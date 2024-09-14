import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import Logo from '../../assets/imgDefault.png'

import { useState, useEffect, useRef } from 'react'

import { useParams } from 'react-router-dom'

import { Toast } from 'primereact/toast'
import { ConfirmPopup } from 'primereact/confirmpopup';
import { DataView } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { BreadCrumb } from 'primereact/breadcrumb';

const statusList = [
    { label: 'Fatal', value: 'Fatal' },
    { label: 'Grave', value: 'Grave' },
    { label: 'Médio', value: 'Médio' },
    { label: 'Leve', value: 'Leve' }
];

export default function AnimalDetail() {

    const { idAnimal } = useParams();

    const [animal, setAnimal] = useState(null);
    const [doencas, setDoencas] = useState([]);
    const [vacinas, setVacinas] = useState([]);

    const [doencasList, setDoencasList] = useState([]);
    const [vacinasList, setVacinasList] = useState([]);

    const [doencaAdd, setDoencaAdd] = useState({ doenca: '' });
    const [vacinaAdd, setVacinaAdd] = useState({ vacina: '' });

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleAddModalVacina, setVisibleAddModalVacina] = useState(false);

    const [doencaListFormat, setDoencaListFormat] = useState([]);
    const [vacinaListFormat, setVacinaListFormat] = useState([]);

    const [buttonEl, setButtonEl] = useState(null);
    const [buttonElVacina, setButtonElVacina] = useState(null);

    const [visibleDeleteModalVacina, setVisibleDeleteModalVacina] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

    const [doencaIdToDelete, setdoencaIdToDelete] = useState(null);
    const [vacinaIdToDelete, setvacinaIdToDelete] = useState(null);

    const [error, setError] = useState(false);

    const toast = useRef(null);
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/animal');
    };

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

    const searchAllVacinas = async () => {
        try {
            const response = await fetch('http://localhost:8080/vacinas');
            const data = await response.json();
            setVacinasList(data);
        } catch (error) {
            console.error('Erro ao buscar vacinas: ', error)
        }
    }

    useEffect(() => {
        searchAllVacinas();
    }, []);


    const searchAnimalInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/animais/${idAnimal}`)

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setAnimal(data);
                } else {
                    setError(true);
                }
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('Erro ao buscar animal: ', error);
            setError(true);
        }
    };

    useEffect(() => {
        searchAnimalInfo();
    }, [idAnimal]);


    const searchAllDoencasForAnimal = async () => {
        try {
            const response = await fetch(`http://localhost:8080/animalDoenca/animal/${idAnimal}`)
            const data = await response.json();
            setDoencas(data);
        } catch (error) {
            console.error('Erro ao buscar animais: ', error)
        }
    }

    useEffect(() => {
        searchAllDoencasForAnimal();
    }, [idAnimal]);

    const searchAllVacinasForAnimal = async () => {
        try {
            const response = await fetch(`http://localhost:8080/animal-vacinas/animal/${idAnimal}`)
            const data = await response.json();
            setVacinas(data);
        } catch (error) {
            console.error('Erro ao buscar animais: ', error)
        }
    }

    useEffect(() => {
        searchAllVacinasForAnimal();
    }, [idAnimal]);

    useEffect(() => {
        if (doencasList.length > 0) {
            const doencaList = doencasList.map((doenca) => ({
                label: doenca.nome,
                value: doenca.id
            }));
            setDoencaListFormat(doencaList);
        }
    }, [doencasList]);

    useEffect(() => {
        if (vacinasList.length > 0) {
            const vacinaList = vacinasList.map((vacina) => ({
                label: vacina.nome,
                value: vacina.id
            }));
            setVacinaListFormat(vacinaList);
        }
    }, [vacinasList]);

    const handleDropdownOnChangeDoenca = (e, field) => {
        setDoencaAdd(prevState => ({
            ...prevState,
            [field]: e.value
        }));
    };

    const handleInputOnChangeDoenca = (e) => {
        const { name, value } = e.target;
        setDoencaAdd(prev => ({ ...prev, [name]: value }));
    };

    const handleDropdownOnChangeVacina = (e, field) => {
        setVacinaAdd(prevState => ({
            ...prevState,
            [field]: e.value
        }));
    };


    const handleInputOnChangeVacina = (e) => {
        const { name, value } = e.target;
        setVacinaAdd(prev => ({ ...prev, [name]: value }));
    };

    if (error) {
        return (
            <div className='flex justify-content-center align-items-center' style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>

                <div className='grid '>
                    <div className='col-12 flex justify-content-center align-items-center'>
                        <p className='text-center font-bold' style={{ marginBottom: '20%' }}>Erro ao buscar dados do animal</p>
                    </div>

                    <div className='col-12 flex justify-content-center align-items-center'>
                        <Button icon='pi pi-arrow-left' severity='success' label='voltar' aria-label='add' onClick={handleNavigation} />
                    </div>

                </div>
            </div>
        )
    }

    if (!animal) {
        return (
            <div className='card flex justify-content-center' style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>
                <ProgressSpinner />
                <p className='text-center font-bold'>Carregando</p>
            </div>
        )
    }

    const doencaListTemplate = (doencas) => {
        return (
            <>
                <div className='col-12' key={doencas.doenca.id}>
                    <div>
                        <div className='mt-3'>
                            <div className='flex flex-column align-items-center sm:align-items-start gap-1'>
                                <div className='text-2xl font-bold text-900'>Nome: {doencas.doenca.nome}</div>
                                <div><p>Gravidade: {doencas.doenca.gravidade}</p></div>
                                <div><p>Status: {doencas.status}</p></div>
                                <div><p>Descrição: {doencas.descricao}</p></div>
                                <Button onClick={(e) => handlePrepareDelete(doencas.id, e.currentTarget)} icon='pi pi-times' className='w-full' />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
            </>
        );
    };

    const vacinaListTemplate = (vacinas) => {
        return (
            <>
                <div className='col-12' key={vacinas.vacina.id}>
                    <div>
                        <div className='mt-3'>
                            <div className='flex flex-column align-items-center sm:align-items-start gap-1'>
                                <div className='text-2xl font-bold text-900'>Nome: {vacinas.vacina.nome}</div>
                                <div><p>Fabricante: {vacinas.vacina.fabricante}</p></div>
                                <div><p>Lote: {vacinas.lote}</p></div>
                                <div><p>Data de Aplicação: {vacinas.dataAplicacao}</p></div>
                                <Button onClick={(e) => handlePrepareDeleteVacina(vacinas.id, e.currentTarget)} icon='pi pi-times' className='w-full' />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
            </>
        );
    };

    const headerModal = (
        <div>
            <span className='font-bold white-space-nowrap'>Cadastrar</span>
        </div>
    );

    const handleAddDoenca = async (e) => {
        e.preventDefault();

        const animalFormat = {
            'animal': {
                'id': idAnimal
            },
            'doenca': {
                'id': doencaAdd.doenca
            },
            'descricao': doencaAdd.descricao,
            'status': doencaAdd.status
        }

        try {
            const response = await fetch('http://localhost:8080/animalDoenca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animalFormat)
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Cadastrado', detail: 'Doença Cadastrada com Sucesso!', life: 3000 })
                setDoencaAdd({ status: '', descricao: '', gravidade: '' })
                await searchAllDoencasForAnimal()
            } else {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Cadastrar Doença!', life: 3000 })
                console.log(response.statusText)
            }
        } catch (error) {
            console.log('Erro na requisição', error)
        }
    }

    const handleAddVacina = async (e) => {
        e.preventDefault();

        const animalFormat = {
            'animal': {
                'id': idAnimal
            },
            'vacina': {
                'id': vacinaAdd.vacina
            },
            'lote': vacinaAdd.lote,
            'dataAplicacao': vacinaAdd.data
        }

        try {
            const response = await fetch('http://localhost:8080/animal-vacinas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animalFormat)
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Cadastrado', detail: 'Vacina Cadastrada com Sucesso!', life: 3000 })
                setVacinaAdd({ status: '', descricao: '', gravidade: '' })
                await searchAllVacinasForAnimal()
            } else {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Cadastrar Vacina!', life: 3000 })
                console.log(response.statusText)
            }
        } catch (error) {
            console.log('Erro na requisição', error)
        }
    }

    const handlePrepareDelete = async (id, button) => {
        setdoencaIdToDelete(id)
        setButtonEl(button)
        setVisibleDeleteModal(true);
    };

    const handlePrepareDeleteVacina = async (id, button) => {
        setvacinaIdToDelete(id)
        setButtonElVacina(button)
        setVisibleDeleteModalVacina(true);
    };

    const handleRejectDeleteDoenca = () => {
        setVisibleDeleteModal(false);
    };

    const handleRejectDeleteVacina = () => {
        setVisibleDeleteModalVacina(false);
    };

    const handleDeleteDoenca = async () => {
        try {
            const response = await fetch(`http://localhost:8080/animalDoenca/${doencaIdToDelete}`, { method: 'DELETE' });
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Deletado', detail: 'Doença Deletada com Sucesso!', life: 3000 });
                await searchAllDoencasForAnimal();

            } else {
                toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Erro ao deletar doença', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Ocorreu um erro ao tentar deletar a doença', life: 3000 });
        } finally {
            setVisibleDeleteModal(false);
        }
    };

    const handleDeleteVacina = async () => {
        try {
            const response = await fetch(`http://localhost:8080/animal-vacinas/${vacinaIdToDelete}`, { method: 'DELETE' });
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Deletado', detail: 'Vacina Deletada com Sucesso!', life: 3000 });
                await searchAllVacinasForAnimal();

            } else {
                toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Erro ao deletar vacina', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Erro !', detail: 'Ocorreu um erro ao tentar deletar a vacina', life: 3000 });
        } finally {
            setVisibleDeleteModalVacina(false);
        }
    };

    const items = [{ label: 'Animais', url: '/animal' }, { label: 'Cuidados Médicos' }]
    const home = { icon: 'pi pi-home', url: '/dashboard' }

    return (
        <>
            <Navbar />

            <BreadCrumb model={items} home={home} className='m-2' />

            <div className='m-6 text-center'>
                <h1>{animal.nome}</h1>
                <img className='w-9 sm:w-16rem xl:w-10rem' src={Logo} alt={animal.nome} />
            </div>

            <div className='col-12'>
                <div className='grid'>
                    <div className='col-12 lg:col-5 flex justify-content-between align-items-center m-auto'>
                        <Button icon='pi pi-slack' label='Cadastrar Doenças' aria-label='AddDoenças' onClick={() => setVisibleAddModal(true)} />
                        <Button icon='pi pi-key' label='Cadastrar Vacinas' aria-label='AddVacinas' onClick={() => setVisibleAddModalVacina(true)} />
                    </div>

                    <div className='col-12'>
                        <Divider />
                    </div>

                    <div className='lg:col-6 col-12 '>
                        <h2 className='text-center'>Doenças</h2>
                        <div>
                            {doencas.length === 0 ? (
                                <div><p className='text-center font-bold' style={{ marginBottom: '20%' }}>Não há doenças cadastrados</p></div>
                            ) : (
                                <DataView value={doencas} itemTemplate={doencaListTemplate} className='m-8' />

                            )}

                        </div>
                    </div>

                    <div className='lg:col-6 col-12 '>
                        <h2 className='text-center'>Vacinas</h2>
                        <div>
                            {vacinas.length === 0 ? (
                                <div><p className='text-center font-bold' style={{ marginBottom: '20%' }}>Não há vacinas cadastradas</p></div>
                            ) : (
                                <DataView value={vacinas} itemTemplate={vacinaListTemplate} className='m-8' />
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />

            <Toast ref={toast} />

            <ConfirmPopup target={buttonEl} visible={visibleDeleteModal} onHide={() => setVisibleDeleteModal(false)} accept={handleDeleteDoenca} reject={handleRejectDeleteDoenca} message='Você deseja excluir a doença desse Animal?' />

            <ConfirmPopup target={buttonElVacina} visible={visibleDeleteModalVacina} onHide={() => setVisibleDeleteModalVacina(false)} accept={handleDeleteVacina} reject={handleRejectDeleteVacina} message='Você deseja excluir a vacina desse Animal?' />


            <Dialog visible={visibleAddModal} modal header={headerModal} style={{ width: '25rem' }} onHide={() => setVisibleAddModal(false)}>
                <form onSubmit={handleAddDoenca}>

                    <div className='field col-12 m-0'>
                        <Dropdown value={doencaAdd.doenca || ''} onChange={(e) => handleDropdownOnChangeDoenca(e, 'doenca')} options={doencaListFormat}
                            placeholder='Doenças' className='w-full' required tooltip='Selecione a doença' tooltipOptions={{ position: 'top', event: 'both' }} />
                    </div>

                    <div className='field col-12 m-0'>
                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Descricao' name='descricao' required className='w-full' tooltip='Digite a descrição' value={doencaAdd.descricao || ''} onChange={handleInputOnChangeDoenca} tooltipOptions={{ event: 'focus', position: 'top' }} />
                    </div>

                    <div className='field col-12 m-0'>
                        <Dropdown value={doencaAdd.status || ''} onChange={(e) => handleDropdownOnChangeDoenca(e, 'status')} options={statusList}
                            placeholder='Gravidade' className='w-full' required tooltip='Selecione o nível de gravidade da doença' tooltipOptions={{ position: 'top', event: 'both' }} />
                    </div>


                    <div className='field col-12 m-0'>
                        <Button type='submit' label='Cadastrar' severity='help' text raised className='w-full' />
                    </div>
                </form>
            </Dialog>

            <Dialog visible={visibleAddModalVacina} modal header={headerModal} style={{ width: '25rem' }} onHide={() => setVisibleAddModalVacina(false)}>
                <form onSubmit={handleAddVacina}>

                    <div className='field col-12 m-0'>
                        <Dropdown value={vacinaAdd.vacina || ''} onChange={(e) => handleDropdownOnChangeVacina(e, 'vacina')} options={vacinaListFormat}
                            placeholder='Vacinas' className='w-full' required tooltip='Selecione a vacina' tooltipOptions={{ position: 'top', event: 'both' }} />
                    </div>

                    <div className='field col-12 m-0'>
                        <InputText placeholder='Lote' name='lote' required className='w-full' tooltip='Digite o número do lote' value={vacinaAdd.lote || ''} onChange={handleInputOnChangeVacina} tooltipOptions={{ event: 'focus', position: 'top' }} />
                    </div>
                    <div className='field col-12 m-0'>
                        <InputText type='date' placeholder='data' name='data' required className='w-full' value={vacinaAdd.data || ''} onChange={handleInputOnChangeVacina} />
                    </div>

                    <div className='field col-12 m-0'>
                        <Button type='submit' label='Cadastrar' severity='help' text raised className='w-full' />
                    </div>
                </form>
            </Dialog>
        </>
    )
}