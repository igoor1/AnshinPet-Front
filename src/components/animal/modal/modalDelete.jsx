import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useDeleteAnimal } from "../../../hooks/animal/useDeleteAnimal";

export const ModalDelete = (refreshAnimals) => {
    const { deleteAnimal, loading, error, success } = useDeleteAnimal();

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

    const openModalDelete = (animalId, animalNome) => {

        Swal.fire({
            title: 'Deletar Animal',
            html: ` Você deseja deletar o animal chamado: ${animalNome} ?
        `,
            focusConfirm: false,
            confirmButtonText: 'Deletar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteAnimal(animalId);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Animal Deletado"
            });

            refreshAnimals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Deletar Animal"
            });
        }
    }, [success, error])

    return { openModalDelete }
}