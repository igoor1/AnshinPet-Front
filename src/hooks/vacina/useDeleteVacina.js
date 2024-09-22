import { useState } from 'react';
import api from '../../services/api';

export const useDeleteVacina = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteVacina = async (vacinaId) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/vacinas/${vacinaId}`);
            return null;
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar vacina';
            setError(errorMensagem);
            return errorMensagem;
        } finally {
            setLoading(false);
        }
    };

    return { deleteVacina, loading, error };
};
