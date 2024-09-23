import { useFetchVacinas } from "../../../hooks/vacina/useFetchVacinas";
import { useCreateMedical } from "../../../hooks/animal/medicals/useCreateMedical";
import { useState } from "react";

const CreateMedicalVacina = ({ onShowToast, animalId, onClose, onRefresh }) => {

    const { vacinas } = useFetchVacinas();
    const { createVacina } = useCreateMedical();

    const [selectedVacinaId, setSelectedVacinaId] = useState("");
    const [lote, setLote] = useState("");
    const [dataAplicacao, setDataAplicacao] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        var vacina = {
            "vacina": {
                "id": selectedVacinaId
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Cadastrar Vacina</h2>
                <div>
                    <label htmlFor="vacinaSelect">Vacina:</label>
                    <select id="vacinaSelect" value={selectedVacinaId} onChange={(e) => setSelectedVacinaId(e.target.value)}  >
                        <option value="">Selecione uma Vacina</option>
                        {vacinas.map((vacina) => (
                            <option key={vacina.id} value={vacina.id}>
                                {vacina.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Lote:</label>
                    <input
                        type="text"
                        name="lote"
                        value={lote}
                        onChange={(e) => setLote(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data de Aplicação:</label>
                    <input
                        type="date"
                        name="Data Aplicação"
                        value={dataAplicacao}
                        onChange={(e) => setDataAplicacao(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </>
    )
}

export default CreateMedicalVacina;