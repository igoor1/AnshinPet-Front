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
            const animaisData = response.data;

            const animaisComFotos = await Promise.all(animaisData.map(async (animal) => {
                try {
                    const fotoResponse = await api.get(`/animais/${animal.id}/foto`);
                    return {
                        ...animal,
                        foto: fotoResponse.data,
                    };
                } catch {
                    return { ...animal, foto: null };
                }
            }));

            setAnimals(animaisComFotos);
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
