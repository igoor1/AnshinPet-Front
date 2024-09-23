import { useFetchDoencas } from "../../../hooks/doenca/useFetchDoencas";
import { useCreateMedical } from "../../../hooks/animal/medicals/useCreateMedical";
import { useState } from "react";

const CreateMedicalDoenca = ({ onShowToast, animalId, onClose, onRefresh }) => {

    const { doencas } = useFetchDoencas();
    const { createDoenca } = useCreateMedical();

    const [selectedDoencaId, setSelectedDoencaId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");


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
            await createDoenca(doenca);
            onShowToast('success', 'Sucesso', 'Doença cadastrada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch (err) {
            onShowToast('error', 'Erro', 'Falha ao cadastrar a Doença.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Cadastrar Doença</h2>
                <div>
                    <label htmlFor="doencaSelect">Doença:</label>
                    <select id="doencaSelect" value={selectedDoencaId} onChange={(e) => setSelectedDoencaId(e.target.value)}  >
                        <option value="">Selecione uma Doença</option>
                        {doencas.map((doenca) => (
                            <option key={doenca.id} value={doenca.id}>
                                {doenca.nome}
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
    )
}

export default CreateMedicalDoenca;