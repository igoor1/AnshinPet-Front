import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useDeleteDoenca } from "../../../hooks/doenca/useDeleteDoenca";

export const ModalDelete = (refreshDoencas) => {
    const { deleteDoenca, loading, error, success } = useDeleteDoenca();

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

    const openModalDelete = (doencaId, doencaNome) => {

        Swal.fire({
            title: 'Deletar Doença',
            html: ` Você deseja deletar a doença chamada: ${doencaNome} ?
        `,
            focusConfirm: false,
            confirmButtonText: 'Deletar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#FF7979",

        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoenca(doencaId);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doença Deletada"
            });

            refreshDoencas()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Deletar Doença"
            });
        }
    }, [success, error])

    return { openModalDelete }
}