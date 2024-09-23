import { useState, useEffect } from 'react';
import api from '../../services/api';

export const useFetchVacinas = () => {
    const [vacinas, setVacinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVacinas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/vacinas');
            setVacinas(response.data);
        } catch (err) {
            setError('Erro ao buscar Vacinas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVacinas();
    }, []);

    return { vacinas, loading, error, refreshVacinas: fetchVacinas };
};
