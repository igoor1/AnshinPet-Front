import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';

import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ConfirmPopup } from 'primereact/confirmpopup';


import { useEffect, useState, useRef } from 'react';


const gravidadeList = [
    { label: 'Baixa', value: 'Baixa' },
    { label: 'Média', value: 'Média' },
    { label: 'Alta', value: 'Alta' }
];

export default function Doenca() {

    const [doencasList, setDoencasList] = useState([]);
    const [doencasAdd, setDoencasAdd] = useState({ nome: '', gravidade: '' });
    const [doencasEdit, setDoencasEdit] = useState([]);

    const [doencaIdToDelete, setDoencaIdToDelete] = useState(null);
    const [doencaIdToEdit, setDoencaIdToEdit] = useState(null);

    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleEditModal, setVisibleEditModal] = useState(false);


    const toast = useRef(null);
    const [buttonEl, setButtonEl] = useState(null);


    const searchAllDoencas = async () => {
        try {
            const response = await fetch('http://localhost:8080/doencas');
            const data = await response.json();
            setDoencasList(data);
        } catch (error) {
            console.error('Erro ao buscar doenças: ', error)
        }
    }

    useEffect(() => {
        searchAllDoencas();
    }, []);

    const searchDoencasForId = async () => {
        try {
            const response = await fetch(`http://localhost:8080/doencas/${doencaIdToEdit}`)
            const data = await response.json();
            if (data) {
                setDoencasEdit(data)
            } else {
                console.log('Erro dados Incompletos')
            }
        } catch (error) {
            console.error('Erro ao buscar doeça: ', error)
        }
    };

    useEffect(() => {
        if (doencaIdToEdit) {
            searchDoencasForId();
        }
    }, [doencaIdToEdit]);


    const handleInputOnChange = (e) => {
        const { name, value } = e.target;
        setDoencasAdd(prev => ({ ...prev, [name]: value }));
    };
    const handleDropdownOnChange = (e, name) => {
        setDoencasAdd(prev => ({ ...prev, [name]: e.value }));
    };

    const handleInputOnChange1 = (e) => {
        const { name, value } = e.target;
        setDoencasEdit(prev => ({ ...prev, [name]: value }));
    };
    const handleDropdownOnChange1 = (e, name) => {
        setDoencasEdit(prev => ({ ...prev, [name]: e.value }));
    };

    const handleAddDoenca = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/doencas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(doencasAdd)
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Cadastrado', detail: 'Doença Cadastrada com Sucesso!', life: 3000 })
                setDoencasAdd({ nome: '', gravidade: '' })
                await searchAllDoencas()
            } else {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Cadastrar doença!', life: 3000 })
                console.log(response.statusText)
            }
        } catch (error) {
            console.log('Erro na requisição', error)
        }
    }

    const handlePrepareDelete = async (id, button) => {
        setDoencaIdToDelete(id)
        setButtonEl(button)
        setVisibleDeleteModal(true);
    };

    const handleDeleteDoenca = async () => {
        try {
            const response = await fetch(`http://localhost:8080/doencas/${doencaIdToDelete}`, { method: 'DELETE' });
            if (response.ok) {
                toast.current.show({ severity: 'info', summary: 'Deletado !', detail: 'Doença Deletada com sucesso', life: 3000 });
                await searchAllDoencas();

            } else {
                toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Erro ao deletar doença', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Ocorreu um erro ao tentar deletar a doença', life: 3000 });
        } finally {
            setVisibleDeleteModal(false);
        }
    };

    const handleRejectDeleteDoenca = () => {
        setVisibleDeleteModal(false);
    };

    const handlePrepareEdit = async (id) => {
        setDoencaIdToEdit(id);
        setVisibleEditModal(true);
    }

    const handleEditDoenca = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/doencas/${doencaIdToEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doencasEdit)
            });

            if (response.ok) {
                toast.current.show({ severity: 'info', summary: 'Operação Realizada !', detail: 'Doença Editada com sucesso', life: 3000 });
                await searchAllDoencas();

            } else {
                console.error('Erro ao atualizar doença:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };


    const headerModalAdd = (
        <div>
            <span className='font-bold white-space-nowrap'>Cadastrar</span>
        </div>
    );
    const headerModalEdit = (
        <div>
            <span className='font-bold white-space-nowrap'>Editar</span>
        </div>
    );

    const doencaListTemplate = (doenca, index) => {
        return (
            <div className='col-12' key={doenca.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className='flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4'>
                        <div className='flex flex-column align-items-center sm:align-items-start gap-3'>
                            <div className='text-2xl font-bold text-900'>{doenca.nome}</div>
                            <div><p>Gravidade: {doenca.gravidade}</p></div>
                        </div>
                        <div className='flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2'>

                            <Button icon='pi pi-pencil' className='p-button-rounded' onClick={() => handlePrepareEdit(doenca.id)}></Button>
                            <Button icon='pi pi-times' className='p-button-rounded' onClick={(e) => handlePrepareDelete(doenca.id, e.currentTarget)}  ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <>
            <Navbar />
            <div className='col-12'>
                <div className='grid'>

                    <div className='col-6 m-auto flex justify-content-center mt-2'>
                        <Button icon='pi pi-plus' severity='success' aria-label='add' label='Cadastrar' onClick={() => setVisibleAddModal(true)} />
                    </div>

                    <div className='col-10 m-auto lg:mb-8'>
                        {doencasList.length === 0 ? (
                            <div><p className='text-center font-bold' style={{ marginBottom: '20%' }}>Não há doenças cadastradas</p></div>
                        ) : (
                            <DataView value={Array.isArray(doencasList) ? doencasList : []} itemTemplate={doencaListTemplate} className='mt-2' />
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            <Toast ref={toast} />

            <ConfirmPopup target={buttonEl} visible={visibleDeleteModal} onHide={() => setVisibleDeleteModal(false)} accept={handleDeleteDoenca} reject={handleRejectDeleteDoenca} message='Você deseja excluir essa Doença?' />

            <Dialog visible={visibleAddModal} modal header={headerModalAdd} style={{ width: '25rem' }} onHide={() => setVisibleAddModal(false)}>
                <form onSubmit={handleAddDoenca}>
                    <div className='field col-12 m-0'>
                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Nome' name='nome' value={doencasAdd.nome || ''} onChange={handleInputOnChange} required className='w-full' tooltip='Digite o nome da doença' tooltipOptions={{ event: 'focus', position: 'top' }} />
                    </div>

                    <div className='field col-12 m-0'>
                        <Dropdown value={doencasAdd.gravidade || ''} onChange={(e) => handleDropdownOnChange(e, 'gravidade')} options={gravidadeList}
                            placeholder='Gravidade' className='w-full' required tooltip='Selecione o nível de gravidade da doença' tooltipOptions={{ position: 'top', event: 'both' }} />
                    </div>

                    <div className='field col-12 m-0'>
                        <Button type='submit' label='Cadastrar' severity='help' text raised className='w-full' />
                    </div>
                </form>
            </Dialog>

            <Dialog visible={visibleEditModal} modal header={headerModalEdit} style={{ width: '25rem' }} onHide={() => setVisibleEditModal(false)}>
                <form onSubmit={handleEditDoenca}>
                    <div className='field col-12 m-0'>
                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Nome' name='nome' value={doencasEdit.nome || ''} onChange={handleInputOnChange1} required className='w-full'
                        />
                    </div>

                    <div className='field col-12 m-0'>
                        <Dropdown value={doencasEdit.gravidade || ''} onChange={(e) => handleDropdownOnChange1(e, 'gravidade')} options={gravidadeList}
                            placeholder='Gravidade' className='w-full' required />
                    </div>

                    <div className='field col-12 m-0'>
                        <Button type='submit' label='Editar' severity='help' text raised className='w-full' />
                    </div>
                </form>
            </Dialog>
        </>
    )
}