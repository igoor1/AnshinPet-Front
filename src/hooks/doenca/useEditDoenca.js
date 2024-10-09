import { useState } from 'react';
import { api } from '../../services/api';

export const useEditDoenca = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const updateDoenca = async (doencaId, updatedDoenca) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.put(`/doencas/${doencaId}`, updatedDoenca);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao editar doença';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return { updateDoenca, loading, error, success };
};
