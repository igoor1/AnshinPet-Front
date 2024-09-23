import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { useEditAnimal } from '../../hooks/animal/useEditAnimal';

import { Loading } from '../../components/loading/loading';

export const EditAnimal = ({ animalId, onClose, onRefresh, onShowToast, visible, setVisible }) => {
    const { animal, loading, error, updateAnimal } = useEditAnimal(animalId);
    const [formValues, setFormValues] = useState({});
    const toast = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (animal) {
            setFormValues(animal);
        }
    }, [animal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAnimal(formValues);
            onShowToast('success', 'Sucesso', 'Animal editado com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
            setVisible(false);
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar o animal.');
        }
    };

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Editar" icon="pi pi-check" severity="success" onClick={() => formRef.current.requestSubmit()} autoFocus />
        </div>
    );


    if (error) return <p>{error}</p>;

    return (
        <>
            <Toast ref={toast} />
            <div className="card flex justify-content-center">
                <Dialog header="Editar Animal" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    {loading ? (
                        <Loading height="50vh" />

                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit} >
                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="nome">Nome</label>
                                        <InputText id="nome" name="nome"
                                            value={formValues.nome || ''}
                                            onChange={handleChange}
                                            required style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="sexo">Sexo</label>
                                        <InputText id="sexo" name="sexo"
                                            value={formValues.sexo || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="tipo">Tipo</label>
                                        <InputText id="tipo" name="tipo"
                                            value={formValues.tipo || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="cor">Cor</label>
                                        <InputText id="cor" name="cor"
                                            value={formValues.cor || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="porte">Porte</label>
                                        <InputText id="porte" name="porte"
                                            value={formValues.porte || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="castrado">Castrado</label>
                                        <InputText id="castrado" name="castrado"
                                            value={formValues.castrado || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="adocao">Adoção</label>
                                        <InputText id="adocao" name="adocao"
                                            value={formValues.adocao || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="raca">Raça</label>
                                        <InputText id="raca" name="raca"
                                            value={formValues.raca || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-content-center mt-2">
                                    <div className="flex flex-column gap-2 w-full">
                                        <label htmlFor="data">Data de Nascimento</label>
                                        <InputText type="date" id="data" name="data"
                                            value={formValues.data || ''}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                        </form>
                    )}
                </Dialog>
            </div>
        </>
    );
};