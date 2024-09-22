import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";

import { useEditVacina } from '../../hooks/vacina/useEditVacina';

const EditVacina = ({ vacinaId, onClose, onRefresh, onShowToast }) => {
    const { vacina, loading, error, updateVacina } = useEditVacina(vacinaId);
    const [formValues, setFormValues] = useState({});
    const toast = useRef(null);

    useEffect(() => {
        if (vacina) {
            setFormValues(vacina);
        }
    }, [vacina]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVacina(formValues);
            onShowToast('success', 'Sucesso', 'Vacina editada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar a Vacina.');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <h2>Editar Vacina</h2>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formValues.nome || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fabricante:</label>
                    <input
                        type="text"
                        name="fabricante"
                        value={formValues.fabricante || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </>
    );
};

export default EditVacina;
