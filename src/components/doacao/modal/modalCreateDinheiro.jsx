import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateDoacao } from "../../../hooks/doacao/useCreateDoacao";

export const ModalCreateDinheiro = (refreshDoacoes) => {
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

    const openModalCreateDinheiro = () => {

        Swal.fire({
            title: 'Cadastro de Doação (Dinheiro)',
            html: `
            <label for="valor" class="form-label labelInput">Valor: </label>
            <input id="valor" placeholder="Digite o valor" class="form-control mb-3" />

            <label for="data" class="form-label labelInput">Data de doação: </label>
            <input id="data" type="date" class="form-control mb-3" max="${todayDate}"/>

            <label for="descricao" class="form-label labelInput">Descrição: </label>
            <input id="descricao" placeholder="Digite a descrição" class="form-control mb-3" />
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#FF7979",

            preConfirm: () => {
                const valor = document.getElementById('valor').value;
                const descricao = document.getElementById('descricao').value;
                const data = document.getElementById('data').value;
                const tipo = "D";
                const quantidade = "";

                if (!descricao || !valor || !data) {
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

    return { openModalCreateDinheiro }
}