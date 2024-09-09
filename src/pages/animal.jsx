import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Logo from '../assets/imgDefault.png'

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast'
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { useEffect, useState, useRef } from "react";

export default function Animal() {
    /* Coleta de dados do animal */
    const [animalEdit, setAnimalEdit] = useState({
        nome: '',
        sexo: '',
        data: '',
        tipo: '',
        cor: '',
        porte: '',
        castrado: '',
        adocao: '',
        raca: ''
    });

    const sexoList = [
        { label: 'Macho', value: 'Macho' },
        { label: 'Fêmea', value: 'Fêmea' }
    ];

    const porteList = [
        { label: 'Pequeno', value: 'Pequeno' },
        { label: 'Medio', value: 'Medio' },
        { label: 'Grande', value: 'Grande' }
    ];

    const castradoList = [
        { label: 'Sim', value: 'Sim' },
        { label: 'Não', value: 'Não' }
    ];

    const adocaoList = [
        { label: 'Sim', value: 'Sim' },
        { label: 'Não', value: 'Não' }
    ];

    const tipoList = [
        { label: 'Cachorro', value: 'Cachorro' },
        { label: 'Gato', value: 'Gato' },
        { label: 'Ave', value: 'Ave' }
    ];

    /* Coleta de dados do animal */

    /* Btn navigate to CreateAnimal */
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/createAnimal');
    }
    /* Btn navigate to CreateAnimal */

    /* List Animal */
    const [animais, setAnimais] = useState([]);

    const searchAllAnimais = async () => {
        try {
            const response = await fetch('http://localhost:8080/animais');
            const data = await response.json();
            setAnimais(data);
        } catch (error) {
            console.error('Erro ao buscar animais: ', error)
        }
    }

    useEffect(() => {
        searchAllAnimais();
    }, [])
    /* List Animal */

    /* List Animal from name*/
    const [nome, setNome] = useState('');
    const [timer, setTimer] = useState(null);

    const searchAnimais = async () => {
        if (nome) {
            try {
                const response = await fetch(`http://localhost:8080/animais/listar/${nome}`);
                const data = await response.json();
                setAnimais(data);
            } catch (error) {
                console.error("Erro ao buscar animais:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNome(value);

        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            if (value) {
                searchAnimais(value);
            } else {
                searchAllAnimais();
            }
        }, 300)

        setTimer(newTimer);
    }
    /* List Animal from name */

    const itemTemplate = (animal, index) => {
        return (
            <div className="col-12" key={animal.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={Logo} alt={animal.nome} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{animal.nome}</div>
                            <div><p>{animal.raca}</p></div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{animal.tipo}</span>
                                </span>
                                <Tag value={`Adoção: ${animal.adocao}`} severity={getSeverity(animal)}></Tag>
                            </div>
                        </div>
                        <Toast ref={toast} />
                        <ConfirmPopup target={buttonEl} visible={visibleDeleteModal} onHide={() => setVisibleDeleteModal(false)} accept={accept} reject={reject} message='Você deseja excluir esse Animal?' />
                        <Dialog header="Header" visible={visibleEdit} style={{ width: '50vw' }} onHide={() => { if (!visibleEdit) return; setVisibleEdit(false); }} >
                            <p className="m-0">
                                <form onSubmit={handleSubmit} className='formgrid grid m-4'>

                                    <div className='field col-12 md:col-6'>
                                        <Dropdown name="tipo" value={animalEdit.tipo} onChange={(e) => handleDropdownChange(e, 'tipo')} options={tipoList}
                                            placeholder="Tipo" className="w-full" required />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <Dropdown value={animalEdit.sexo} onChange={(e) => handleDropdownChange(e, 'sexo')} options={sexoList}
                                            placeholder="Selecione o Sexo" className="w-full" required />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <Dropdown value={animalEdit.porte} onChange={(e) => handleDropdownChange(e, 'porte')} options={porteList}
                                            placeholder="Selecione o Porte" className="w-full" required />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <Dropdown value={animalEdit.castrado} onChange={(e) => handleDropdownChange(e, 'castrado')} options={castradoList}
                                            placeholder="Castrado ?" className="w-full" required />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <Dropdown value={animalEdit.adocao} onChange={(e) => handleDropdownChange(e, 'adocao')} options={adocaoList}
                                            placeholder="Para adoção ?" className="w-full" required />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Nome' name="nome" value={animalEdit.nome} onChange={handleChange} required className='w-full' />

                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Raça' name="raca" value={animalEdit.raca} onChange={handleChange} required className='w-full' />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <InputText type='date' placeholder='Data' name="data" value={animalEdit.data} onChange={handleChange} required className='w-full' />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Cor' name="cor" value={animalEdit.cor} onChange={handleChange} required className='w-full' />
                                    </div>

                                    <div className='field col-12 md:col-6'>
                                        <Button type='submit' label='Cadastrar' severity='help' text raised className='w-full' />
                                    </div>

                                </form>
                            </p>
                        </Dialog>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">

                            <Button onClick={(e) => handleDelete(animal.id, e.currentTarget)} icon='pi pi-times' className="p-button-rounded" />
                            <Button onClick={() => handleEdit(animal.id)} icon="pi pi-pencil" className="p-button-rounded" ></Button>
                            <Button icon="pi pi-heart-fill" className="p-button-rounded" ></Button>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /* Color tag adoção*/
    const getSeverity = (animal) => {
        switch (animal.adocao) {
            case 'Sim':
                return 'success';

            case 'Não':
                return 'danger';

            default:
                return null;
        }
    };
    /* Color tag adoção*/
    /* List Animal */

    /* Delete animal */
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [animalIdToDelete, setanimalIdToDelete] = useState(null);
    const [buttonEl, setButtonEl] = useState(null);
    const toast = useRef(null);

    const handleDelete = async (id, button) => {
        setanimalIdToDelete(id)
        setButtonEl(button)
        setVisibleDeleteModal(true);
    }

    const accept = async () => {
        try {
            const response = await fetch(`http://localhost:8080/animais/${animalIdToDelete}`, { method: 'DELETE' });
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Deletado !', detail: 'Animal deletado com sucesso', life: 3000 });

                const updateResponse = await fetch('http://localhost:8080/animais');
                if (updateResponse.ok) {
                    const updateAnimais = await updateResponse.json();
                    setAnimais(updateAnimais);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Erro ao recarregar lista animal', life: 3000 });
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Erro ao deletar animal', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Ocorreu um erro ao tentar deletar o animal', life: 3000 });
        } finally {
            setVisibleDeleteModal(false);
        }

    };

    const reject = () => {
        setVisibleDeleteModal(false);
    };
    /* Delete animal */

    /* Edit animal */
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [animalIdToEdit, setAnimalIdToEdit] = useState(null);

    /* Busca dados do animal através do id */
    useEffect(() => {
        if (animalIdToEdit) {
            fetch(`http://localhost:8080/animais/${animalIdToEdit}`)
                .then(response => response.json())
                .then(data => setAnimalEdit(data))
                .catch(error => console.error('Erro ao buscar animal:', error));
        }
    }, [animalIdToEdit]);
    /* Busca dados do animal através do id */


    /* Abre a modal e armazena o id para editar */
    const handleEdit = async (id) => {
        setAnimalIdToEdit(id);
        setVisibleEdit(true)
    };
    /* Abre a modal e armazena o id para editar */

    /* De acordo com as alterações do input, ele salva a alteração */

    /* InputText */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnimalEdit((prevAnimalEdit) => ({
            ...prevAnimalEdit,
            [name]: value
        }));
    };
    /* InputText */

    /* DropDown */
    const handleDropdownChange = (e, name) => {
        setAnimalEdit((prevAnimalEdit) => ({
            ...prevAnimalEdit,
            [name]: e.value
        }));
    };
    /* DropDown */

    /* De acordo com as alterações do input, ele salva a alteração */

    /* Estrutura para salvar alterações + atualiza a lista de animais */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/animais/${animalIdToEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(animalEdit),
            });

            if (response.ok) {
                toast.current.show({ severity: 'info', summary: 'Operação Realizada !', detail: 'Animal Editado com sucesso', life: 3000 });
                const updateResponse1 = await fetch('http://localhost:8080/animais');
                if (updateResponse1.ok) {
                    const updateAnimais = await updateResponse1.json();
                    setAnimais(updateAnimais);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Erro ao recarregar lista animal', life: 3000 });
                }
            } else {
                console.error('Erro ao atualizar animal:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    /* Estrutura para salvar alterações + atualiza a lista de animais */
    /* Edit animal */

    return (
        <>
            <Navbar />
            <div className="col-12">
                <div className="grid">

                    <div className="col-6 m-auto inline-flex justify-content-center mt-2">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText v-model="value1" placeholder="Pesquise pelo nome" value={nome}
                                onChange={handleInputChange} className="w-full" />
                        </IconField>

                    </div>

                    <div className="col-3 m-auto flex justify-content-end mt-2">
                        <Button icon='pi pi-plus' severity='success' aria-label='add' onClick={handleNavigation} />
                    </div>


                    <div className="col-10 m-auto">
                        {animais.length === 0 ? (
                            <div><p className="text-center font-bold" style={{ marginBottom: '20%' }}>Não há animais cadastrados</p></div>
                        ) : (
                            <DataView value={animais} itemTemplate={itemTemplate} className="mt-2" />

                        )}
                    </div>
                </div>

            </div>


            <Footer />
        </>
    )
}