import { useState, useEffect } from 'react';
import api from '../../services/api';

export const useFetchDoacoes = () => {
    const [doacoes, setDoacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoacoes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/doacoes');
            setDoacoes(response.data);
        } catch (err) {
            setError('Erro ao buscar doações');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoacoes();
    }, []);

    return { doacoes, loading, error, refreshDoacoes: fetchDoacoes };
};
