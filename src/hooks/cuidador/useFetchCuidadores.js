import { useState, useEffect } from 'react';
import api from '../../services/api';

export const useFetchCuidadores = () => {
    const [cuidadores, setCuidadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCuidadores = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/usuarios');
            setCuidadores(response.data);
        } catch (err) {
            setError('Erro ao buscar cuidadores');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCuidadores();
    }, []);

    return { cuidadores, loading, error, refreshCuidadores: fetchCuidadores };
};
