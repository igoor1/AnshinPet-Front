import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useDeleteVacina } from "../../../hooks/vacina/useDeleteVacina";

export const ModalDelete = (refreshVacinas) => {
    const { deleteVacina, loading, error, success } = useDeleteVacina();

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

    const openModalDelete = (vacinaId, vacinaNome) => {

        Swal.fire({
            title: 'Deletar Vacina',
            html: ` Você deseja deletar a vacina chamada: ${vacinaNome} ?
        `,
            focusConfirm: false,
            confirmButtonText: 'Deletar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteVacina(vacinaId);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Vacina Deletada"
            });

            refreshVacinas();
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Deletar Vacina"
            });
        }
    }, [success, error])

    return { openModalDelete }
}