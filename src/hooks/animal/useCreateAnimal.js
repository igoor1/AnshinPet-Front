import { useState } from 'react';
import api from '../../services/api';

export const useCreateAnimal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createAnimal = async (newAnimal) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/animais', newAnimal);
            setSuccess(true);
        } catch (err) {
            setError('Erro ao cadastrar animal');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createAnimal, loading, error, success };
};
