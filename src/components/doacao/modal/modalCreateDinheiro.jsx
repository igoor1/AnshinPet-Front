import { useEffect, useState } from "react";
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
            <input id="valor" placeholder="valor" class="form-control mb-3" />
            <input id="data" type="date" class="form-control mb-3" max="${todayDate}"/>
            <input id="descricao" placeholder="Decrição" class="form-control mb-3" />
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

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