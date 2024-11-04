import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { useDeleteCuidador } from "../../../hooks/cuidador/useDeleteCuidador";

export const ModalDelete = (refreshCuidadores) => {
    const { deleteCuidador, loading, error, success } = useDeleteCuidador();

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

    const openModalDelete = (cuidadorId, cuidadorNome) => {

        Swal.fire({
            title: 'Deletar Cuidador',
            html: ` Você deseja deletar o cuidador chamado/a: ${cuidadorNome} ?
        `,
            focusConfirm: false,
            confirmButtonText: 'Deletar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#FF7979",

        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteCuidador(cuidadorId);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Cuidador Deletado"
            });

            refreshCuidadores()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Deletar Cuidador"
            });
        }
    }, [success, error])

    return { openModalDelete }
}