import { useState } from 'react';
import api from '../../services/api';

export const useDeleteVacina = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteVacina = async (vacinaId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.delete(`/vacinas/${vacinaId}`);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar vacina';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteVacina, loading, error, success };
};
