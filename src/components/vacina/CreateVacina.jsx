import { useState, useRef } from 'react';
import { useCreateVacina } from '../../hooks/vacina/useCreateVacina';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { Loading } from '../../components/loading/loading';

const CreateVacina = ({ onClose, onRefresh, onShowToast, visibleCreate }) => {
    const { createVacina, loading, error } = useCreateVacina();
    const [formValues, setFormValues] = useState({ nome: '', fabricante: '' });
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVacina(formValues);
            onShowToast('success', 'Sucesso', 'Vacina cadastrada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
            onClose();
        } catch (err) {
            onShowToast('error', 'Erro', 'Falha ao cadastrar a Vacina.');
        }
    };

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={onClose} className="p-button-text" />
            <Button label="Cadastrar" icon="pi pi-check" severity="success" onClick={() => formRef.current.requestSubmit()} autoFocus />
        </div>
    );

    if (error) return <p>{error}</p>;

    return (
        <>
            <Dialog header="Cadastrar" visible={visibleCreate} style={{ width: '50vw' }} onHide={onClose} footer={footerContent}>
                {loading ? (
                    <Loading height="50vh" />

                ) : (
                    <form onSubmit={handleSubmit} ref={formRef}>
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
                                    <label htmlFor="fabricante">Fabricante</label>
                                    <InputText id="fabricante" name="fabricante"
                                        value={formValues.fabricante || ''}
                                        onChange={handleChange}
                                        required style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Dialog>
        </>
    );
};

export default CreateVacina;
