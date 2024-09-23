import { useState } from 'react';
import api from '../../services/api';

export const useDeleteAnimal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteAnimal = async (animalId) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/animais/${animalId}`);
            return null;
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar animal';
            setError(errorMensagem);
            return errorMensagem;
        } finally {
            setLoading(false);
        }
    };

    return { deleteAnimal, loading, error };
};
