import { useState, useEffect, useRef } from 'react';

import { Toast } from "primereact/toast";

import { useEditAnimal } from '../../hooks/animal/useEditAnimal';

const EditAnimal = ({ animalId, onClose, onRefresh, onShowToast }) => {
    const { animal, loading, error, updateAnimal } = useEditAnimal(animalId);
    const [formValues, setFormValues] = useState({});
    const toast = useRef(null);

    useEffect(() => {
        if (animal) {
            setFormValues(animal);
        }
    }, [animal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAnimal(formValues);
            onShowToast('success', 'Sucesso', 'Animal editado com sucesso!');
            setTimeout(onRefresh, 1500);
            setTimeout(onClose, 1500);
        } catch {
            onShowToast('error', 'Erro', 'Falha ao editar o animal.');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <h2>Editar Animal</h2>
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
                    <label>Sexo:</label>
                    <input
                        type="text"
                        name="sexo"
                        value={formValues.sexo || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tipo:</label>
                    <input
                        type="text"
                        name="tipo"
                        value={formValues.tipo || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cor:</label>
                    <input
                        type="text"
                        name="cor"
                        value={formValues.cor || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Porte:</label>
                    <input
                        type="text"
                        name="porte"
                        value={formValues.porte || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Castrado:</label>
                    <input
                        type="text"
                        name="castrado"
                        value={formValues.castrado || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Adoção:</label>
                    <input
                        type="text"
                        name="Adoção"
                        value={formValues.adocao || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Raça:</label>
                    <input
                        type="text"
                        name="raca"
                        value={formValues.raca || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Idade:</label>
                    <input
                        type="date"
                        name="data"
                        value={formValues.data || ''}
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

export default EditAnimal;
