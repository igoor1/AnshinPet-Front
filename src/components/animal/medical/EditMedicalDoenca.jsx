import { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { useEditMedicalDoenca } from '../../../hooks/animal/medicals/useEditMedicalDoenca';
import { useFetchDoencas } from "../../../hooks/doenca/useFetchDoencas";

const EditMedicalDoenca = ({ doencaId, onClose, onRefresh, onShowToast, animalId, visibleEditDoenca }) => {
    const { doenca, loading, error, updatedDoenca } = useEditMedicalDoenca(doencaId);
    const { doencas } = useFetchDoencas();

    const [selectedDoencaId, setSelectedDoencaId] = useState(null);
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");

    const formRef = useRef(null);

    useEffect(() => {
        if (doenca) {
            setSelectedDoencaId(doenca.doenca.id);
            setDescricao(doenca.descricao);
            setStatus(doenca.status)
        }
    }, [doenca]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        var doencaData = {
            "doenca": {
                "id": selectedDoencaId
            },
            "animal": {
                "id": animalId
            },
            "descricao": descricao,
            "status": status
        };

        try {
            await updatedDoenca(doencaData);
            onShowToast('success', 'Sucesso', 'Doença editada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar a doença.');
        }
    };

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={onClose} className="p-button-text" />
            <Button label="Cadastrar" icon="pi pi-check" severity="success" onClick={() => formRef.current.requestSubmit()} autoFocus />
        </div>
    );

    return (
        <>
            <Dialog header="Editar Doença" visible={visibleEditDoenca} style={{ width: '50vw' }} onHide={onClose} footer={footerContent}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div>
                        <label htmlFor="doencaDropdown">Doença:</label>
                        <Dropdown
                            id="doencaDropdown"
                            value={selectedDoencaId}
                            options={doencas}
                            onChange={(e) => setSelectedDoencaId(e.value)}
                            optionLabel="nome"
                            optionValue="id"
                            placeholder="Selecione uma doença"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <div className="flex justify-content-center mt-2">
                            <div className="flex flex-column gap-2 w-full">
                                <label htmlFor="descricao">Descrição</label>
                                <InputText id="descricao" name="descricao"
                                    value={descricao || ''}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Digite a descrição"
                                    required style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-content-center mt-2">
                            <div className="flex flex-column gap-2 w-full">
                                <label htmlFor="status">Status</label>
                                <InputText id="status" name="status"
                                    value={status || ''}
                                    onChange={(e) => setStatus(e.target.value)}
                                    placeholder="Digite o status"
                                    required style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default EditMedicalDoenca;
