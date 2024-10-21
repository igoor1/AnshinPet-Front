import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEditFoto } from "../../../hooks/animal/useEditFotoAnimal";

export const ModalEditFoto = (refreshAnimals) => {
    const { editFoto, loading, error, success } = useEditFoto();

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

    const openModalEditFoto = (animal) => {

        Swal.fire({
            title: `Edição de foto do Animal (${animal.nome})`,
            html:
                `
            <label for="foto" class="form-label labelInput">Foto: </label>
            <input id="foto" type="file" placeholder="Foto" class="form-control mb-3" accept="image/*"/>`,
            focusConfirm: false,
            confirmButtonText: 'Editar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const id = animal.id;
                const nome = animal.nome;
                const foto = document.getElementById('foto').files[0];

                if (!foto) {
                    Swal.showValidationMessage('Por favor, insira a foto');
                }

                return { id, nome, foto };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = result.value;

                await editFoto(data)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Foto do animal Editado"
            });

            refreshAnimals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Editar a foto do animal"
            });
        }
    }, [success, error])

    return { openModalEditFoto }
}