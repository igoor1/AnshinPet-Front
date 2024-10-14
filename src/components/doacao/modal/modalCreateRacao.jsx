import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateDoacao } from "../../../hooks/doacao/useCreateDoacao";

export const ModalCreateRacao = (refreshDoacoes) => {
    const { createDoacao, error, loading, success } = useCreateDoacao();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getCurrentDate();

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

    const openModalCreateRacao = () => {

        Swal.fire({
            title: 'Cadastro de Doação (Ração)',
            html: `
            <label for="quantidade" class="form-label labelInput">Quantidade: </label>
            <input id="quantidade" type="number" placeholder="Digite a quantidade" class="form-control mb-3" />

            <label for="data" class="form-label labelInput">Data de doação: </label>
            <input id="data" type="date" class="form-control mb-3" max="${todayDate}"/>

            <label for="descricao" class="form-label labelInput">Descrição: </label>
            <input id="descricao" placeholder="Digite a descrição" class="form-control mb-3" />
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const quantidade = document.getElementById('quantidade').value;
                const descricao = document.getElementById('descricao').value;
                const data = document.getElementById('data').value;
                const tipo = "R";
                const valor = "";

                if (!descricao || !quantidade || !data) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { tipo, valor, descricao, data, quantidade };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const doacao = result.value;

                await createDoacao(doacao)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doação Cadastrada"
            });

            refreshDoacoes()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Doação"
            });
        }
    }, [success, error])

    return { openModalCreateRacao }
}