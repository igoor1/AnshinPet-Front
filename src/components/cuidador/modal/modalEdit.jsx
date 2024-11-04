import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { useEditCuidador } from "../../../hooks/cuidador/useEditCuidador";

export const ModalEdit = (refreshCuidadores) => {
    const { updateCuidador, loading, error, success } = useEditCuidador();

    const sexoList = [
        {
            label: 'Masculino',
            value: 'M'
        },
        {
            label: 'Feminino',
            value: 'F'
        }
    ];

    const roleList = [
        {
            label: 'Usuário',
            value: 'USER'
        },
        {
            label: 'Admin',
            value: 'ADMIN'
        }
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

    const openModalEdit = (cuidador) => {

        Swal.fire({
            title: 'Edição de Cuidador',
            html: `

            
            <label for="nome" class="form-label labelInput">Nome: </label>
            <input id="nome" placeholder="Digite o nome" class="form-control mb-3" value="${cuidador.nome}"/>


            <label for="role" class="form-label labelInput">Tipo: </label>
            <select id="role" class="form-select mb-3">
                <option selected disabled value="">Selecione o tipo</option>
                ${roleList.map(t =>
                `<option value="${t.value}" ${t.value === cuidador.role ? 'selected' : ''}>
                    ${t.label}
                    </option>`).join('')}
            </select>

            <label for="sexo" class="form-label labelInput">Sexo: </label>
            <select id="sexo" class="form-select mb-3">
                <option selected disabled value="">Selecione o sexo</option>
                ${sexoList.map(s =>
                    `<option value="${s.value}" ${s.value === cuidador.sexo ? 'selected' : ''}>
                    ${s.label}
                    </option>`).join('')}
            </select>

          
            <label for="celular" class="form-label labelInput">Celular: </label>
            <input id="celular" placeholder="Digite o celular" class="form-control mb-3" value="${cuidador.celular}"/>

         
            <label for="cpf" class="form-label labelInput">Cpf: </label>
            <input id="cpf" placeholder="Digite o cpf" class="form-control mb-3" value="${cuidador.cpf}"/>

            
            <label for="email" class="form-label labelInput">Email: </label>
            <input id="email" placeholder="Digite o email" class="form-control mb-3" value="${cuidador.email}"/>
            
        `,
            focusConfirm: false,
            confirmButtonText: 'Editar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#FF7979",

            preConfirm: () => {
                const id = cuidador.id;
                const nome = document.getElementById('nome').value;
                const role = document.getElementById('role').value;
                const sexo = document.getElementById('sexo').value;
                const celular = document.getElementById('celular').value;
                const cpf = document.getElementById('cpf').value;
                const email = document.getElementById('email').value;
                const senha = "1";

                if (!nome || !celular || !cpf || !sexo || !role || !email) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { id, nome, sexo, role, celular, cpf, email, senha };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const cuidador = result.value;
                await updateCuidador(cuidador.id, cuidador);
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Cuidador Editado"
            });

            refreshCuidadores()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Editar Cuidador"
            });
        }
    }, [success, error])

    return { openModalEdit }
}