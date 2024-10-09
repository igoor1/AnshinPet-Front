import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useDeleteDoacao } from "../../../hooks/doacao/useDeleteDoacao";

export const ModalDelete = (refreshDoacoes) => {
    const { deleteDoacao, loading, error, success } = useDeleteDoacao();

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

    const openModalDelete = (doacaoId) => {

        Swal.fire({
            title: 'Deletar Doação',
            html: ` Você deseja deletar essa doação?
        `,
            focusConfirm: false,
            confirmButtonText: 'Deletar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoacao(doacaoId);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doação Deletada"
            });

            refreshDoacoes()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Deletar Doação"
            });
        }
    }, [success, error])

    return { openModalDelete }
}