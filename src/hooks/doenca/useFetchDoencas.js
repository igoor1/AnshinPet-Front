import { useState, useEffect } from 'react';
import api from '../../services/api';

export const useFetchDoencas = () => {
    const [doencas, setDoencas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoencas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/doencas');
            setDoencas(response.data);
        } catch (err) {
            setError('Erro ao doencas animais');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoencas();
    }, []);

    return { doencas, loading, error, refreshDoencas: fetchDoencas };
};
