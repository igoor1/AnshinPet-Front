import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useDeleteVacina } from "../../../../hooks/animal/medicals/useDeleteVacina";

export const ModalDeleteVacina = (refreshMedicals) => {
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

    const openModalDeleteVacina = (vacinaNome, vacinaId) => {

        Swal.fire({
            title: 'Deletar Vacina',
            html: ` Você deseja deletar do animal a vacina chamada: ${vacinaNome} ?
        `,
            focusConfirm: false,
            confirmButtonText: 'Deletar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
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

            refreshMedicals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Deletar Vacina"
            });
        }
    }, [success, error])

    return { openModalDeleteVacina }
}