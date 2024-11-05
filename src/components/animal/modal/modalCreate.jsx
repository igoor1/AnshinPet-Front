import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateAnimal } from "../../../hooks/animal/useCreateAnimal";

export const ModalCreate = (refreshAnimals) => {
    const { createAnimalWithFoto, loading, error, success } = useCreateAnimal();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getCurrentDate();


    const sexoList = [
        {
            label: 'Macho',
            value: 'M'
        },
        {
            label: 'Fêmea',
            value: 'F'
        }
    ];

    const porteList = [
        {
            label: 'Pequeno',
            value: 'P'
        },
        {
            label: 'Médio',
            value: 'M'
        },
        {
            label: 'Grande',
            value: 'G'
        }
    ];

    const castradoList = [
        {
            label: 'Sim',
            value: 'S'
        },
        {
            label: 'Não',
            value: 'N'
        }
    ];

    const adocaoList = [
        {
            label: 'Sim',
            value: 'S'
        },
        {
            label: 'Não',
            value: 'N'
        }
    ];
    const tipoList = [
        {
            label: 'Cachorro',
            value: 'C'
        },
        {
            label: 'Gato',
            value: 'G'
        },
        {
            label: 'Ave',
            value: 'A'
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
            title: 'Cadastro de Animal',
            customClass: {
                popup: 'custom-height'
            },
            html: `
            <div class="mb-3">
                <label for="tipo" class="form-label labelInput">Tipo: </label>
                <select id="tipo" class="form-select">
                    <option selected disabled value="">Selecione o tipo</option>
                    ${tipoList.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
                </select>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="nome" class="form-label labelInput">Nome: </label>
                    <input id="nome" placeholder="Digite o nome" class="form-control" />
                </div>
                <div class="col-md-6">
                    <label for="raca" class="form-label labelInput">Raça: </label>
                    <input id="raca" placeholder="Digite a raça" class="form-control" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="data" class="form-label labelInput">Data de Nascimento: </label>
                    <input id="data" type="date" class="form-control" max="${todayDate}"/>
                </div>
                <div class="col-md-6">
                    <label for="cor" class="form-label labelInput">Cor: </label>
                    <input id="cor" placeholder="Digite a cor" class="form-control" />
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
                    <label for="porte" class="form-label labelInput">Porte: </label>
                    <select id="porte" class="form-select">
                        <option selected disabled value="">Selecione o porte</option>
                        ${porteList.map(p => `<option value="${p.value}">${p.label}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="castrado" class="form-label labelInput">Castrado: </label>
                    <select id="castrado" class="form-select">
                        <option selected disabled value="">É castrado?</option>
                        ${castradoList.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
                    </select>
                </div>

                <div class="col-md-6">
                    <label for="adocao" class="form-label labelInput">Adoção: </label>
                    <select id="adocao" class="form-select">
                        <option selected disabled value="">É para adoção?</option>
                        ${adocaoList.map(a => `<option value="${a.value}">${a.label}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label for="foto" class="form-label labelInput">Foto (opcional): </label>
                <input id="foto" type="file" placeholder="Foto" class="form-control" accept="image/*"/>
            </div>
            
        `,
            focusConfirm: false,
            confirmButtonText: '<i class="bi bi-plus"></i> Cadastrar',
            showCancelButton: true,
            cancelButtonText: '<i class="bi bi-dash"></i> Cancelar',
            cancelButtonColor: "#FF7979",

            preConfirm: () => {
                const nome = document.getElementById('nome').value;
                const raca = document.getElementById('raca').value;
                const data = document.getElementById('data').value;
                const cor = document.getElementById('cor').value;
                const sexo = document.getElementById('sexo').value;
                const tipo = document.getElementById('tipo').value;
                const porte = document.getElementById('porte').value;
                const castrado = document.getElementById('castrado').value;
                const adocao = document.getElementById('adocao').value;
                const foto = document.getElementById('foto').files[0];

                if (!nome || !raca || !data || !cor || !sexo || !tipo || !porte || !castrado || !adocao) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { nome, raca, data, cor, sexo, tipo, porte, castrado, adocao, foto };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const animal = result.value;

                await createAnimalWithFoto(animal)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Animal Cadastrado"
            });

            refreshAnimals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Cadastrar Animal"
            });
        }
    }, [success, error])

    return { openModalCreate }
}