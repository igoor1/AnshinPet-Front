import { useState } from 'react';
import { api } from '../../services/api';

export const useEditAnimal = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const updateAnimal = async (animalId, updatedAnimal) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.put(`/animais/${animalId}`, updatedAnimal);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao editar animal';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return { updateAnimal, loading, error, success };
};
