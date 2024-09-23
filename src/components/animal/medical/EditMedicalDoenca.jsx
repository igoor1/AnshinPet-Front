import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";

import { useEditMedicalDoenca } from '../../../hooks/animal/medicals/useEditMedicalDoenca';
import { useFetchDoencas } from "../../../hooks/doenca/useFetchDoencas";

const EditMedicalDoenca = ({ doencaId, onClose, onRefresh, onShowToast, animalId }) => {
    const { doenca, loading, error, updatedDoenca } = useEditMedicalDoenca(doencaId);
    const { doencas } = useFetchDoencas();

    const [selectedDoencaId, setSelectedDoencaId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");

    const toast = useRef(null);


    useEffect(() => {
        if (doenca) {
            setSelectedDoencaId(doenca.doenca.id);
            setDescricao(doenca.descricao);
            setStatus(doenca.status)
        }
    }, [doenca]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        var doenca = {
            "doenca": {
                "id": selectedDoencaId
            },
            "animal": {
                "id": animalId
            },
            "descricao": descricao,
            "status": status
        }

        try {
            await updatedDoenca(doenca);
            onShowToast('success', 'Sucesso', 'Doença editada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar a doença.');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <h2>Editar Doença</h2>
                <div>
                    <label htmlFor="doencaSelect">Doença:</label>
                    <select
                        id="doencaSelect"
                        value={selectedDoencaId}
                        onChange={(e) => setSelectedDoencaId(e.target.value)}
                        required
                    >
                        {doencas.map((doencaItem) => (
                            <option
                                key={doencaItem.id}
                                value={doencaItem.id}
                            >
                                {doencaItem.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        name="Descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </>
    );
};

export default EditMedicalDoenca;
