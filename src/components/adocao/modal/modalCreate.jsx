import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateInteresseAdocao } from "../../../hooks/adocao/useCreateInteresseAdocao";

import './modalCreate.scss'

export const ModalCreate = (animalData) => {
    const { createInteresseAdocao, loading, error, success } = useCreateInteresseAdocao();

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

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const todayDate = getCurrentDate();

    const openModalCreate = () => {

        Swal.fire({
            title: 'Cadastro de Interesse de adoção',
            customClass: {
                popup: 'custom-height'
            },
            html: `
            <div class="mb-3">
                <label for="nome" class="form-label labelInput">Nome: </label>
                <input id="nome" placeholder="Digite o nome" class="form-control" />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label labelInput">Email: </label>
                <input id="email" type="email" placeholder="Digite o email" class="form-control" />
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="cpf" class="form-label labelInput">Cpf: </label>
                    <input id="cpf" placeholder="Digite o cpf" class="form-control"/>
                </div>
                <div class="col-md-6">
                    <label for="data" class="form-label labelInput">Data de Nascimento: </label>
                    <input id="data" type="date" class="form-control" max="${todayDate}"/>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="sexo" class="form-label labelInput">Sexo: </label>
                    <select id="sexo" class="form-select">
                        <option selected disabled value="">Selecione o sexo</option>
                        ${sexoList.map(s => `<option value="${s.value}">${s.label}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="celular" class="form-label labelInput">Celular: </label>
                    <input id="celular" placeholder="Digite o celular" class="form-control" />
                </div>
            </div>
            
            <div class="mb-3">
                <label for="descricao" class="form-label labelInput">Descrição: </label>
                <textarea id="descricao" placeholder="Digite a descrição" class="form-control" rows="3"/></textarea>
            </div>

            <div class="mb-3">
                <label for="cep" class="form-label labelInput">Cep: </label>
                <input id="cep" placeholder="Digite o cep" class="form-control"  onChange="pesquisacep(this.value)"/>
            </div>
            
            <div class="mb-3">
                <label for="endereco" class="form-label labelInput">Endereço: </label>
                <input id="endereco" class="form-control" disabled/>
            </div>

            <div class="mb-3">
                <label for="bairro" class="form-label labelInput">Bairro: </label>
                <input id="bairro" class="form-control" disabled/>
            </div>

            <div class="mb-3">
                <label for="cidade" class="form-label labelInput">Cidade: </label>
                <input id="cidade" class="form-control" disabled/>
            </div>

             <div class="mb-3">
                <label for="complemento" class="form-label labelInput">Complemento: </label>
                <input id="complemento" class="form-control"/>
            </div>
        `,
            focusConfirm: false,
            confirmButtonText: '<i class="bi bi-plus"></i> Cadastrar',
            showCancelButton: true,
            cancelButtonText: '<i class="bi bi-dash"></i> Cancelar',
            cancelButtonColor: "#FF7979",


            preConfirm: () => {
                const nome = document.getElementById('nome').value;
                const email = document.getElementById('email').value;
                const sexo = document.getElementById('sexo').value;
                const dataNascimento = document.getElementById('data').value;
                const celular = document.getElementById('celular').value;
                const cpf = document.getElementById('cpf').value;
                const descricao = document.getElementById('descricao').value;
                const status = "E" //Em espera
                const cep = document.getElementById('cep').value;
                const endereco = document.getElementById('endereco').value;
                const complemento = document.getElementById('complemento').value;
                const bairro = document.getElementById('bairro').value;
                const cidade = document.getElementById('cidade').value;
                const animal = animalData;


                if (!nome || !email || !sexo || !dataNascimento || !celular || !cpf || !descricao || !status || !cep || !complemento) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { nome, email, sexo, dataNascimento, celular, cpf, descricao, status, cep, endereco, complemento, bairro, cidade, animal };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const interesse = result.value;
                console.log(interesse);
                await createInteresseAdocao(interesse);
            }
        });
    };

    window.limpa_formulário_cep = () => {
        document.getElementById('endereco').value = "";
        document.getElementById('bairro').value = "";
        document.getElementById('cidade').value = "";
    };

    window.meu_callback = (conteudo) => {
        if (!("erro" in conteudo)) {
            document.getElementById('endereco').value = conteudo.logradouro;
            document.getElementById('bairro').value = conteudo.bairro;
            document.getElementById('cidade').value = conteudo.localidade;
        } else {
            limpa_formulário_cep();
            Swal.showValidationMessage('Cep não encontrado');
        }
    };

    window.pesquisacep = (valor) => {
        console.log("CEP inserido:", valor);
        const cep = valor.replace(/\D/g, '');

        if (cep !== "") {
            const validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                document.getElementById('endereco').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";

                const script = document.createElement('script');
                script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
                document.body.appendChild(script);
            } else {
                limpa_formulário_cep();
                Swal.showValidationMessage('Cep inválido');
            }
        } else {
            limpa_formulário_cep();
        }
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Interesse de adoação"
            });
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Interesse de adoação"
            });
        }
    }, [success, error])

    return { openModalCreate }
}