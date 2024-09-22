import { useState } from 'react';
import api from '../../services/api';

export const useDeleteDoenca = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteDoenca = async (doencaId) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/doencas/${doencaId}`);
            return null;
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar doenca';
            setError(errorMensagem);
            return errorMensagem;
        } finally {
            setLoading(false);
        }
    };

    return { deleteDoenca, loading, error };
};
