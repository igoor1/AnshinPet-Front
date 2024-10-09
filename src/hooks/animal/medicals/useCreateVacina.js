import { useState } from 'react';
import api from '../../../services/api';

export const useCreateVacina = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createVacina = async (newVacina) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/animal-vacinas', newVacina);
            setSuccess(true);
        } catch (err) {
            setError('Erro ao cadastrar vacina do animal');
            console.error(err);
        } finally {
            setLoading(false);
        }

    }

    return { createVacina, loading, error, success };
}