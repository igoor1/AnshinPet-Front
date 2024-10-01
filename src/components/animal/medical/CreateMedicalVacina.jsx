import { useFetchVacinas } from "../../../hooks/vacina/useFetchVacinas";
import { useCreateMedical } from "../../../hooks/animal/medicals/useCreateMedical";
import { useState, useRef } from "react";

import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

const CreateMedicalVacina = ({ onShowToast, animalId, onClose, onRefresh, visibleCreateVacina }) => {

    const { vacinas } = useFetchVacinas();
    const { createVacina } = useCreateMedical();

    const [selectedVacina, setSelectedVacina] = useState("");
    const [lote, setLote] = useState("");
    const [dataAplicacao, setDataAplicacao] = useState("");
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var vacina = {
            "vacina": {
                "id": selectedVacina.id
            },
            "animal": {
                "id": animalId
            },
            "lote": lote,
            "dataAplicacao": dataAplicacao
        }
        try {
            await createVacina(vacina);
            onShowToast('success', 'Sucesso', 'vacina cadastrada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
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

    return (
        <>
            <Dialog header="Cadastrar Vacina" visible={visibleCreateVacina} style={{ width: '50vw' }} onHide={onClose} footer={footerContent}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div>
                        <label htmlFor="vacinaSelect">Vacina:</label>
                        <Dropdown
                            id="vacinaSelect"
                            value={selectedVacina}
                            options={vacinas}
                            onChange={(e) => setSelectedVacina(e.value)}
                            optionLabel="nome"
                            placeholder="Selecione uma vacina"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <div className="flex justify-content-center mt-2">
                            <div className="flex flex-column gap-2 w-full">
                                <label htmlFor="lote">Lote</label>
                                <InputText id="lote" name="lote"
                                    value={lote || ''}
                                    onChange={(e) => setLote(e.target.value)}
                                    placeholder="Digite o lote"
                                    required style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-content-center mt-2">
                            <div className="flex flex-column gap-2 w-full">
                                <label htmlFor="dataAplicacao">Data de Aplicação</label>
                                <InputText id="dataAplicacao" name="dataAplicacao"
                                    value={dataAplicacao || ''}
                                    onChange={(e) => setDataAplicacao(e.target.value)}
                                    type="date"
                                    required style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default CreateMedicalVacina;