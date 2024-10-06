import { useState } from 'react';
import api from '../../services/api';

export const useCreateDoacao = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createDoacao = async (newDoacao) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/doacoes', newDoacao);
            setSuccess(true);
        } catch (err) {
            setError('Erro ao doação vacina');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createDoacao, loading, error, success };
};
