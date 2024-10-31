import { useState } from 'react';
import api from '../../services/api';

export const useCreateInteresseAdocao = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createInteresseAdocao = async (interesseAdocao) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/interesses', interesseAdocao);
            setSuccess(true)
        } catch (err) {
            setError(`Erro ao interesse de adoção:  ${err.response?.data?.message || err.message}`);
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return { createInteresseAdocao, loading, error, success };
};
