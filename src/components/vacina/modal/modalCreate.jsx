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
            <label for="nome" class="form-label labelInput">Nome: </label>
            <input id="nome" placeholder="Digite o nome" class="form-control mb-3" />

            <label for="fabricante" class="form-label labelInput">Fabricante: </label>
            <input id="fabricante" placeholder="Digite o fabricante" class="form-control mb-3" />
        `,
            focusConfirm: false,
            confirmButtonText: '<i class="bi bi-check2"></i> Cadastrar',
            showCancelButton: true,
            cancelButtonText: '<i class="bi bi-x"></i> Fechar',
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