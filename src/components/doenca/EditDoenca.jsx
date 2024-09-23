import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";

import { useEditDoenca } from '../../hooks/doenca/useEditDoenca';

const EditDoenca = ({ doencaId, onClose, onRefresh, onShowToast }) => {
    const { doenca, loading, error, updateDoenca } = useEditDoenca(doencaId);
    const [formValues, setFormValues] = useState({});
    const toast = useRef(null);

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
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar a Doença.');
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
                    <label>Gravidade:</label>
                    <input
                        type="text"
                        name="gravidade"
                        value={formValues.gravidade || ''}
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

export default EditDoenca;
