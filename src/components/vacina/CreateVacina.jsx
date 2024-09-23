import { useState } from 'react';
import { useCreateVacina } from '../../hooks/vacina/useCreateVacina';

const CreateVacina = ({ onClose, onRefresh, onShowToast }) => {
    const { createVacina, loading, error } = useCreateVacina();
    const [formValues, setFormValues] = useState({ nome: '', fabricante: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVacina(formValues);
            onShowToast('success', 'Sucesso', 'Vacina cadastrada com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch (err) {
            onShowToast('error', 'Erro', 'Falha ao cadastrar a Vacina.');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Cadastrar Vacina</h2>
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
                <button type="submit">Cadastrar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </>
    );
};

export default CreateVacina;
