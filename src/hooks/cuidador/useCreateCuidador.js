import { useState } from 'react';
import api from '../../services/api';

export const useCreateCuidador = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createCuidador = async (newCuidador) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/auth/register', newCuidador);
            setSuccess(true);
        } catch (err) {
            setError('Erro ao criar cuidador');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createCuidador, loading, error, success };
};
