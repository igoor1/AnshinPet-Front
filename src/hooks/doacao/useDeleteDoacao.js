import { useState } from 'react';
import api from '../../services/api';

export const useDeleteDoacao = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteDoacao = async (doacaoId) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/doacoes/${doacaoId}`);
            return null;
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar doação';
            setError(errorMensagem);
            return errorMensagem;
        } finally {
            setLoading(false);
        }
    };

    return { deleteDoacao, loading, error };
};
