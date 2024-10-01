import { useFetchDoencas } from "../../../hooks/doenca/useFetchDoencas";
import { useCreateMedical } from "../../../hooks/animal/medicals/useCreateMedical";
import { useState, useRef } from "react";

import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

const CreateMedicalDoenca = ({ onShowToast, animalId, onClose, onRefresh, visibleCreateDoenca }) => {

    const { doencas } = useFetchDoencas();
    const { createDoenca } = useCreateMedical();

    const [selectedDoenca, setSelectedDoenca] = useState(null);
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");
    const formRef = useRef(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        var doenca = {
            "doenca": {
                "id": selectedDoenca.id
            },
            "animal": {
                "id": animalId
            },
            "descricao": descricao,
            "status": status
        }
        try {
            await createDoenca(doenca);
            onShowToast('success', 'Sucesso', 'Doença cadastrada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch (err) {
            onShowToast('error', 'Erro', 'Falha ao cadastrar a Doença.');
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
            <Dialog header="Cadastrar Doença" visible={visibleCreateDoenca} style={{ width: '50vw' }} onHide={onClose} footer={footerContent}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div>
                        <label htmlFor="doencaSelect">Doença:</label>
                        <Dropdown
                            id="doencaDropdown"
                            value={selectedDoenca}
                            options={doencas}
                            onChange={(e) => setSelectedDoenca(e.value)}
                            optionLabel="nome"
                            placeholder="Selecione uma doença"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <div className="flex justify-content-center mt-2">
                            <div className="flex flex-column gap-2 w-full">
                                <label htmlFor="descricao">Descrição</label>
                                <InputText id="decricao" name="decricao"
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
    )
}

export default CreateMedicalDoenca;