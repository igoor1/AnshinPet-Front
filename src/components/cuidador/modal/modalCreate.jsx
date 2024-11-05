import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateCuidador } from "../../../hooks/cuidador/useCreateCuidador";

export const ModalCreate = (refreshCuidadores) => {
    const { createCuidador, error, loading, success } = useCreateCuidador();

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

    const openModalCreate = () => {

        Swal.fire({
            title: 'Cadastro de Cuidador',
            customClass: {
                popup: 'custom-height'
            },
            html: `
            <div class="mb-3">
                <label for="role" class="form-label labelInput">Tipo: </label>
                <select id="role" class="form-select">
                    <option selected disabled value="">Selecione o tipo</option>
                    ${roleList.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
                </select>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="nome" class="form-label labelInput">Nome: </label>
                    <input id="nome" placeholder="Digite o nome" class="form-control" />
                </div>
                <div class="col-md-6">
                    <label for="sexo" class="form-label labelInput">Sexo: </label>
                    <select id="sexo" class="form-select">
                        <option selected disabled value="">Selecione o sexo</option>
                        ${sexoList.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="celular" class="form-label labelInput">Celular: </label>
                    <input id="celular" placeholder="Digite o celular" class="form-control" />
                </div>

                <div class="col-md-6">
                    <label for="cpf" class="form-label labelInput">Cpf: </label>
                    <input id="cpf" placeholder="Digite o cpf" class="form-control" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                       <label for="email" class="form-label labelInput">Email: </label>
                       <input id="email" placeholder="Digite o email" class="form-control" />
                 </div>

                <div class="col-md-6">
                    <label for="senha" class="form-label labelInput">Senha: </label>
                    <input id="senha" placeholder="Digite a senha" class="form-control" />
                </div>
            </div>    
        `,
            focusConfirm: false,
            confirmButtonText: '<i class="bi bi-plus"></i> Cadastrar',
            showCancelButton: true,
            cancelButtonText: '<i class="bi bi-dash"></i> Cancelar',
            cancelButtonColor: "#FF7979",

            preConfirm: () => {
                const nome = document.getElementById('nome').value;
                const role = document.getElementById('role').value;
                const sexo = document.getElementById('sexo').value;
                const celular = document.getElementById('celular').value;
                const cpf = document.getElementById('cpf').value;
                const email = document.getElementById('email').value;
                const senha = document.getElementById('senha').value;

                if (!nome || !celular || !cpf || !sexo || !role || !email || !senha) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { nome, sexo, role, celular, cpf, email, senha };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const cuidador = result.value;

                await createCuidador(cuidador)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Cuidador Cadastrado"
            });

            refreshCuidadores();

        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Cuidador"
            });
        }
    }, [success, error])

    return { openModalCreate }
}