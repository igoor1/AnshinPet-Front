import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEditAnimal } from "../../../hooks/animal/useEditAnimal";

export const ModalEdit = (refreshAnimals) => {
    const { updateAnimal, loading, error, success } = useEditAnimal();

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

    const openModalEdit = (animal) => {

        Swal.fire({
            title: 'Edição de Animal',
            html: `
            <select id="tipo" class="form-select mb-3">
                <option disabled>Tipo</option>
                ${tipoList.map(t =>
                `<option value="${t.value}" ${t.value === animal.tipo ? 'selected' : ''}>
                    ${t.label}
                </option>`).join('')}
            </select>
            <input id="nome" placeholder="Nome" class="form-control mb-3" value="${animal.nome}"/>
            <input id="raca" placeholder="Raça" class="form-control mb-3" value="${animal.raca}"/>
                <input id="data" type="date" class="form-control mb-3" max="${todayDate}" value="${animal.data}"/>
            <input id="cor" placeholder="Cor" class="form-control mb-3" value="${animal.cor}"/>
            <select id="sexo" class="form-select mb-3">
                <option disabled>Sexo</option>
                ${sexoList.map(s =>
                    `<option value="${s.value}" ${s.value === animal.sexo ? 'selected' : ''}>
                    ${s.label}
                </option>`).join('')}
            </select>
            <select id="porte" class="form-select mb-3">
                <option disabled>Porte</option>
                ${porteList.map(p =>
                        `<option value="${p.value}" ${p.value === animal.porte ? 'selected' : ''}>
                    ${p.label}
                    </option>`).join('')}
            </select>
            <select id="castrado" class="form-select mb-3">
                <option disabled selected>Castrado?</option>
                ${castradoList.map(c =>
                            `<option value="${c.value}" ${c.value === animal.castrado ? 'selected' : ''}>
                    ${c.label}</option>`).join('')}
            </select>
            <select id="adocao" class="form-select mb-3">
                <option disabled selected>Para adoção?</option>
                ${adocaoList.map(a =>
                                `<option value="${a.value}" ${a.value === animal.adocao ? 'selected' : ''}>
                    ${a.label}</option>`).join('')}
            </select>
        `,
            focusConfirm: false,
            confirmButtonText: 'Editar',
            showCancelButton: true,
            cancelButtonText: 'Fechar',
            cancelButtonColor: "#dc3545",

            preConfirm: () => {
                const id = animal.id;
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

                return { id, nome, raca, data, cor, sexo, tipo, porte, castrado, adocao };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const animal = result.value;
                await updateAnimal(animal.id, animal)
            }
        });
    };

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Animal Editado"
            });

            refreshAnimals()
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro ao Editar Animal"
            });
        }
    }, [success, error])

    const handleInputChange = (key, value) => {
        setAnimalData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return { openModalEdit }
}