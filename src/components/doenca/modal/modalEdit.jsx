import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEditDoenca } from "../../../hooks/doenca/useEditDoenca";

export const ModalEdit = (refreshDoencas) => {
    const { updateDoenca, loading, error, success } = useEditDoenca();

    const gravidadeList = [
        {
            label: 'Baixa',
            value: 'B'
        },
        {
            label: 'Média',
            value: 'M'
        },
        {
            label: 'Alta',
            value: 'A'
        },
    ];

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

    const openModalEdit = (doenca) => {

        Swal.fire({
            title: 'Edição de Doença',
            html: `
            <label for="nome" class="form-label labelInput">Nome: </label>
            <input id="nome" placeholder="Digite o nome" class="form-control mb-3" value="${doenca.nome}" />

            <label for="gravidade" class="form-label labelInput">Gravidade: </label>
            <select id="gravidade" class="form-select mb-3">
                <option disabled value="">Selecione a gravidade</option>
                ${gravidadeList.map(g =>
                `<option value="${g.value}" ${g.value === doenca.gravidade ? 'selected' : ''}>
                    ${g.label}
                    </option>`).join('')}
            </select>
        `,
            focusConfirm: false,
            confirmButtonText: 'Editar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const id = doenca.id;
                const nome = document.getElementById('nome').value;
                const gravidade = document.getElementById('gravidade').value;

                if (!nome || !gravidade) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { id, nome, gravidade };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const doenca = result.value;
                await updateDoenca(doenca.id, doenca)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Doença Editada"
            });

            refreshDoencas()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Editar Doença"
            });
        }
    }, [success, error])

    return { openModalEdit }
}