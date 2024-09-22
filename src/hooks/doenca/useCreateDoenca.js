import { useState } from 'react';
import api from '../../services/api';

export const useCreateDoenca = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createDoenca = async (newDoenca) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/doencas', newDoenca);
            setSuccess(true);
        } catch (err) {
            setError('Erro ao cadastrar doença');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createDoenca, loading, error, success };
};
