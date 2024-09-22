import { useState } from 'react';
import { useCreateDoenca } from '../../hooks/doenca/useCreateDoenca';

const CreateDoenca = ({ onClose, onRefresh, onShowToast }) => {
    const { createDoenca, loading, error } = useCreateDoenca();
    const [formValues, setFormValues] = useState({ nome: '', gravidade: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDoenca(formValues);
            onShowToast('success', 'Sucesso', 'Doença cadastrada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch (err) {
            onShowToast('error', 'Erro', 'Falha ao cadastrar a Doença.');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Cadastrar Doença</h2>
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
                <button type="submit">Cadastrar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </>
    );
};

export default CreateDoenca;
