import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateVacina } from "../../../hooks/vacina/useCreateVacina";

export const ModalCreate = (refreshVacinas) => {
    const { createVacina, loading, error, success } = useCreateVacina();

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

    const openModalCreate = () => {

        Swal.fire({
            title: 'Cadastro de Vacina',
            html: `
            <input id="nome" placeholder="Nome" class="form-control mb-3" />
            <input id="fabricante" placeholder="Fabricante" class="form-control mb-3" />
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const nome = document.getElementById('nome').value;
                const fabricante = document.getElementById('fabricante').value;

                if (!nome || !fabricante) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { nome, fabricante };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const vacina = result.value;
                await createVacina(vacina);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Vacina Cadastrada"
            });

            refreshVacinas()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Vacina"
            });
        }
    }, [success, error])

    return { openModalCreate }
}