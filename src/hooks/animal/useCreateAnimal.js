import { useState } from 'react';
import api from '../../services/api';

export const useCreateAnimal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createAnimal = async (animal) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post('/animais', animal);
            return response.data.id;
        } catch (err) {
            setError(`Erro ao cadastrar animal:  ${err.response?.data?.message || err.message}`);
            console.error(err);
            throw err;
        }
    };

    const createAnimalFoto = async (animalId, file, descricao) => {
        const formData = new FormData();
        formData.append('arquivo', file);
        formData.append('descricao', descricao);

        try {
            await api.put(`/animais/${animalId}/foto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (err) {
            setError(`Erro ao cadastrar foto:  ${err.response?.data?.message || err.message}`);
            console.error(err);
            throw err;
        }
    }

    const createAnimalWithFoto = async (newAnimal) => {
        setLoading(true);
        setError(null);

        try {
            const animalId = await createAnimal(newAnimal);
            if (!animalId) throw new Error('Id do animal não encontrado')

            if (newAnimal.foto) {
                await createAnimalFoto(animalId, newAnimal.foto, newAnimal.nome)
            }
            setSuccess(true);
        } catch (err) {
            setError('Erro ao cadastrar animal: ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    return { createAnimalWithFoto, loading, error, success };
};
