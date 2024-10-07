import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useCreateAnimal } from "../../../hooks/animal/useCreateAnimal";

export const ModalCreate = (refreshAnimals) => {
    const { createAnimal, loading, error, success } = useCreateAnimal();

    const [animalData, setAnimalData] = useState({
        nome: '',
        data: '',
        cor: '',
        raca: '',
        sexo: '',
        porte: '',
        castrado: '',
        adocao: '',
        tipo: '',
    });

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
            html: `
            <select id="tipo" class="form-select mb-3">
                <option disabled selected>Tipo</option>
                ${tipoList.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
            </select>
            <input id="nome" placeholder="Nome" class="form-control mb-3" />
            <input id="raca" placeholder="Raça" class="form-control mb-3" />
                <input id="data" type="date" class="form-control mb-3" max="${todayDate}"/>
            <input id="cor" placeholder="Cor" class="form-control mb-3" />
            <select id="sexo" class="form-select mb-3">
                <option disabled selected>Sexo</option>
                ${sexoList.map(s => `<option value="${s.value}">${s.label}</option>`).join('')}
            </select>
            <select id="porte" class="form-select mb-3">
                <option disabled selected>Porte</option>
                ${porteList.map(p => `<option value="${p.value}">${p.label}</option>`).join('')}
            </select>
            <select id="castrado" class="form-select mb-3">
                <option disabled selected>Castrado?</option>
                ${castradoList.map(c => `<option value="${c.value}">${c.label}</option>`).join('')}
            </select>
            <select id="adocao" class="form-select mb-3">
                <option disabled selected>Para adoção?</option>
                ${adocaoList.map(a => `<option value="${a.value}">${a.label}</option>`).join('')}
            </select>
        `,
            focusConfirm: false,
            confirmButtonText: 'Cadastrar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

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

                if (!nome || !raca || !data || !cor || !sexo || !tipo || !porte || !castrado || !adocao) {
                    Swal.showValidationMessage('Por favor, preencha todos os campos');
                }

                return { nome, raca, data, cor, sexo, tipo, porte, castrado, adocao };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const animal = result.value;

                await createAnimal(animal)
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

    const handleInputChange = (key, value) => {
        setAnimalData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return { openModalCreate }
}