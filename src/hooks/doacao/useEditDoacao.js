import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const useEditDoacao = (doacaoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const updateDoacao = async (doacaoId, updatedDoacao) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.put(`/doacoes/${doacaoId}`, updatedDoacao);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao editar doação';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return { updateDoacao, loading, error, success };
};
