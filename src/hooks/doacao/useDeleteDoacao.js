import { useState } from 'react';
import api from '../../services/api';

export const useDeleteDoacao = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const deleteDoacao = async (doacaoId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.delete(`/doacoes/${doacaoId}`);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar doação';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteDoacao, loading, error, success };
};
