import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { Loading } from '../../components/loading/loading';

import { useEditDoenca } from '../../hooks/doenca/useEditDoenca';

const EditDoenca = ({ doencaId, onClose, onRefresh, onShowToast, visibleEdit }) => {
    const { doenca, loading, error, updateDoenca } = useEditDoenca(doencaId);
    const [formValues, setFormValues] = useState({});
    const toast = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (doenca) {
            setFormValues(doenca);
        }
    }, [doenca]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoenca(formValues);
            onShowToast('success', 'Sucesso', 'Doença editada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
            onClose();
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar a Doença.');
        }
    };

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={onClose} className="p-button-text" />
            <Button label="Editar" icon="pi pi-check" severity="success" onClick={() => formRef.current.requestSubmit()} autoFocus />
        </div>
    );

    if (error) return <p>{error}</p>;

    return (
        <>
            <Toast ref={toast} />
            <Dialog header="Editar Doença" visible={visibleEdit} style={{ width: '50vw' }} onHide={onClose} footer={footerContent}>
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
                                    <label htmlFor="gravidade">Gravidade</label>
                                    <InputText id="gravidade" name="gravidade"
                                        value={formValues.gravidade || ''}
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

export default EditDoenca;
