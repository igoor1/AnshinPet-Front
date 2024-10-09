import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEditDoacao } from "../../../hooks/doacao/useEditDoacao";

export const ModalEditDinheiro = (refreshDoacoes) => {
    const { updateDoacao, loading, error, success } = useEditDoacao();

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

    const openModalEditDinheiro = (doacao) => {

        Swal.fire({
            title: 'Edição de Doação (Dinheiro)',
            html: `
            <input id="valor" placeholder="valor" class="form-control mb-3" value="${doacao.valor}" />
            <input id="data" type="date" class="form-control mb-3" max="${todayDate}" value="${doacao.data}" />
            <input id="descricao" placeholder="Descrição" class="form-control mb-3" value="${doacao.descricao}" />
        `,
            focusConfirm: false,
            confirmButtonText: 'Editar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const id = doacao.id
                const valor = document.getElementById('valor').value;
                const descricao = document.getElementById('descricao').value;
                const data = document.getElementById('data').value;
                const tipo = "D";
                const quantidade = "";

                if (!descricao || !valor || !data) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { id, tipo, valor, descricao, data, quantidade };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const doacao = result.value;
                await updateDoacao(doacao.id, doacao)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doação Editada"
            });

            refreshDoacoes()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Editar Doação"
            });
        }
    }, [success, error])

    return { openModalEditDinheiro }
}