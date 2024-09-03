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

import { useEffect, useState, useRef } from "react";

export default function Animal() {

    /* Btn navigate to CreateAnimal */
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/createAnimal');
    }
    /* Btn navigate to CreateAnimal */

    /* List Animal */
    const [animais, setAnimais] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/animais')
            .then(response => response.json())
            .then(data => setAnimais(data))
            .catch(error => console.error('Erro ao buscar animais: ', error))
    }, [])

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
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">

                            <Button onClick={(e) => handleDelete(animal.id, e.currentTarget)} icon='pi pi-times' className="p-button-rounded" />
                            <Button icon="pi pi-pencil" className="p-button-rounded" ></Button>
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

    return (
        <>
            <Navbar />

            <Button icon='pi pi-plus' severity='success' aria-label='add' className='mt-2 ml-2' onClick={handleNavigation} />
            {animais.length === 0 ? (
                <div><p className="text-center font-bold" style={{ marginBottom: '20%' }}>Não há animais cadastrados</p></div>
            ) : (
                <DataView value={animais} itemTemplate={itemTemplate} className="mt-2" />

            )}

            <Footer />
        </>
    )
}