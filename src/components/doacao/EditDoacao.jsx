import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Loading } from '../../components/loading/loading';

import { useEditDoacao } from '../../hooks/doacao/useEditDoacao';

const EditDoacao = ({ doacaoId, onClose, onRefresh, onShowToast, visibleEdit }) => {
    const { doacao, loading, error, updateDoacao } = useEditDoacao(doacaoId);
    const [formValues, setFormValues] = useState({});
    const toast = useRef(null);
    const formRef = useRef(null);

    const tipoDoacaoOptions = [
        { label: 'Dinheiro', value: 'D' },
        { label: 'Ração', value: 'R' }
    ];

    useEffect(() => {
        if (doacao) {
            setFormValues(doacao);
            console.log(doacao)
        }
    }, [doacao]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };


    const handleTipoDoacaoChange = (e) => {
        setFormValues(prev => ({ ...prev, tipo: e.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoacao(formValues);
            onShowToast('success', 'Sucesso', 'Doação editada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
            onClose();
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar a Doação.');
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
                                    <label htmlFor="tipo">Tipo</label>
                                    <Dropdown
                                        id="tipo"
                                        value={formValues.tipo}
                                        options={tipoDoacaoOptions}
                                        onChange={handleTipoDoacaoChange}
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Selecione o tipo de doação"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="valor">Valor</label>
                                    <InputText id="valor" name="valor"
                                        value={formValues.valor || ''}
                                        onChange={handleChange}
                                        required style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <InputText id="quantidade" name="quantidade"
                                        value={formValues.quantidade || ''}
                                        onChange={handleChange}
                                        required style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="descricao">Descrição</label>
                                    <InputText id="descricao" name="descricao"
                                        value={formValues.descricao || ''}
                                        onChange={handleChange}
                                        required style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="data">Data</label>
                                    <InputText id="data" name="data" type='date'
                                        value={formValues.data || ''}
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

export default EditDoacao;
