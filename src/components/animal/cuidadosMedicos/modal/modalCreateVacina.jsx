import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { useFetchVacinas } from "../../../../hooks/vacina/useFetchVacinas";
import { useCreateVacina } from "../../../../hooks/animal/medicals/useCreateVacina";

export const ModalCreateVacina = (animalId, refreshMedicals) => {
    const { vacinas, error: errorVacinas, loading: loadingVacinas } = useFetchVacinas();
    const { createVacina, loading, success, error } = useCreateVacina();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const openModalCreateVacina = () => {

        Swal.fire({
            title: `Cadastro de Vacinas`,
            html: `
            <label for="vacina" class="form-label labelInput">Vacina: </label>
            <select id="vacina" class="form-select mb-3">
                <option selected disabled value="">Doenças</option>
                ${vacinas.map(v => `<option value="${v.id}">${v.nome}</option>`).join('')}
            </select>

            <label for="lote" class="form-label labelInput">Lote: </label>
            <input id="lote" placeholder="Digite o lote" class="form-control mb-3" />

            <label for="dataAplicacao" class="form-label labelInput">Data de aplicação: </label>
            <input id="dataAplicacao" type="date" class="form-control mb-3"/>
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const lote = document.getElementById('lote').value;
                const vacina = document.getElementById('vacina').value;
                const dataAplicacao = document.getElementById('dataAplicacao').value;


                if (!lote || !vacina || !dataAplicacao) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { animalId, vacina, lote, dataAplicacao };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const vacina = result.value;

                const data = {
                    "animal": {
                        "id": vacina.animalId
                    },
                    "vacina": {
                        "id": vacina.vacina
                    },
                    "dataAplicacao": vacina.dataAplicacao,
                    "lote": vacina.lote
                }

                await createVacina(data)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Vacina Cadastrada"
            });

            refreshMedicals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Vacina"
            });
        }

        if (errorVacinas) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Buscar Vacinas"
            });
        }
    }, [success, error, errorVacinas])


    return { openModalCreateVacina }
}