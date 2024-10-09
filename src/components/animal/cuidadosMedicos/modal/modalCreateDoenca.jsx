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
            <select id="doenca" class="form-select mb-3">
                <option disabled selected>Doenças</option>
                ${doencas.map(d => `<option value="${d.id}">${d.nome}</option>`).join('')}
            </select>
            <input id="descricao" placeholder="Descrição" class="form-control mb-3" />
            <select id="status" class="form-select mb-3">
                <option disabled selected>Status</option>
                ${statusList.map(s => `<option value="${s.value}">${s.label}</option>`).join('')}
            </select>
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

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