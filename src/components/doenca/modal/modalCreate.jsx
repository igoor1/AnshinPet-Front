import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateDoenca } from '../../../hooks/doenca/useCreateDoenca'

export const ModalCreate = (refreshDoencas) => {
    const { createDoenca, loading, error, success } = useCreateDoenca();

    const gravidadeList = [
        {
            label: 'Baixa',
            value: 'B'
        },
        {
            label: 'Média',
            value: 'M'
        },
        {
            label: 'Alta',
            value: 'A'
        },
    ];

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

    const openModalCreate = () => {

        Swal.fire({
            title: 'Cadastro de Doença',
            html: `
            <label for="nome" class="form-label labelInput">Nome: </label>
            <input id="nome" placeholder="Digite o nome" class="form-control mb-3" />

            <label for="gravidade" class="form-label labelInput">Gravidade: </label>
            <select id="gravidade" class="form-select mb-3">
                <option selected disabled value="">Selecione a gravidade</option>
                ${gravidadeList.map(g => `<option value="${g.value}">${g.label}</option>`).join('')}
            </select>
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const nome = document.getElementById('nome').value;
                const gravidade = document.getElementById('gravidade').value;

                if (!nome || !gravidade) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { nome, gravidade };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const doenca = result.value;

                await createDoenca(doenca)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doença Cadastrada"
            });

            refreshDoencas()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Doença"
            });
        }
    }, [success, error])

    return { openModalCreate }
}