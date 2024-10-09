import { useState, useEffect } from 'react';
import api from '../../services/api';

export const useFetchAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnimals = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/animais');
            setAnimals(response.data);
        } catch (err) {
            setError('Erro ao buscar animais');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    return { animals, loading, error, refreshAnimals: fetchAnimals };
};
