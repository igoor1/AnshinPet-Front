import { useState } from 'react';
import api from '../../services/api';

export const useDeleteAnimal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteAnimal = async (animalId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.delete(`/animais/${animalId}`);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar animal';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteAnimal, loading, error, success };
};
