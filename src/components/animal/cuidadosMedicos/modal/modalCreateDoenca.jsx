import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { useFetchDoencas } from "../../../../hooks/doenca/useFetchDoencas";
import { useCreateDoenca } from "../../../../hooks/animal/medicals/useCreateDoenca";

export const ModalCreateDoenca = (animalId, refreshMedicals) => {
    const { doencas, error: errorDoencas, loading: loadingDoencas } = useFetchDoencas();
    const { createDoenca, loading, success, error } = useCreateDoenca();

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


    const statusList = [
        {
            label: 'Curado',
            value: 'C'
        },
        {
            label: 'Em tratamento',
            value: 'T'
        },
    ];


    const openModalCreateDoenca = () => {

        Swal.fire({
            title: `Cadastro de Doenças`,
            html: `
            <label for="doenca" class="form-label labelInput">Doença: </label>
            <select id="doenca" class="form-select mb-3">
                <option selected disabled value="">Escolha uma doença</option>
                ${doencas.map(d => `<option value="${d.id}">${d.nome}</option>`).join('')}
            </select>

            <label for="descricao" class="form-label labelInput">Descrição: </label>
            <input id="descricao" placeholder="Digite a descrição" class="form-control mb-3" />

            <label for="status" class="form-label labelInput">Status: </label>
            <select id="status" class="form-select mb-3">
                <option selected disabled value="">Escolha um status</option>
                ${statusList.map(s => `<option value="${s.value}">${s.label}</option>`).join('')}
            </select>
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#FF7979",

            preConfirm: () => {
                const descricao = document.getElementById('descricao').value;
                const doenca = document.getElementById('doenca').value;
                const status = document.getElementById('status').value;


                if (!descricao || !doenca || !status) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { animalId, descricao, doenca, status };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const doenca = result.value;

                const data = {
                    "animal": {
                        "id": doenca.animalId
                    },
                    "doenca": {
                        "id": doenca.doenca
                    },
                    "descricao": doenca.descricao,
                    "status": doenca.status
                }

                await createDoenca(data)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doença Cadastrada"
            });

            refreshMedicals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Doença"
            });
        }

        if (errorDoencas) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Buscar Doenças"
            });
        }
    }, [success, error, errorDoencas])


    return { openModalCreateDoenca }
}