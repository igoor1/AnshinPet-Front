import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEditVacina } from "../../../hooks/vacina/useEditVacina";

export const ModalEdit = (refreshVacinas) => {

    const { updateVacina, loading, error, success } = useEditVacina();

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

    const openModalEdit = (vacina) => {

        Swal.fire({
            title: 'Edição de Doença',
            html: `
            <label for="nome" class="form-label labelInput">Nome: </label>
            <input id="nome" placeholder="Digite o nome" class="form-control mb-3" value="${vacina.nome}"/>

            <label for="fabricante" class="form-label labelInput">Fabricante: </label>
            <input id="fabricante" placeholder="Digite o fabricante" class="form-control mb-3" value="${vacina.fabricante}" />
        `,
            focusConfirm: false,
            confirmButtonText: 'Editar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const id = vacina.id;
                const nome = document.getElementById('nome').value;
                const fabricante = document.getElementById('fabricante').value;

                if (!nome || !fabricante) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { id, nome, fabricante };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const vacina = result.value;
                await updateVacina(vacina.id, vacina)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Vacina Editada"
            });

            refreshVacinas()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Editar Vacina"
            });
        }
    }, [success, error])

    return { openModalEdit }
}