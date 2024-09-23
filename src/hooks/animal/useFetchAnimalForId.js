import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const useFetchAnimalForId = (animalId) => {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchAnimalForId = async () => {
        try {
            const response = await api.get(`/animais/${animalId}`);
            setAnimal(response.data);
        } catch (err) {
            setError('Erro ao buscar animal');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimalForId();
    }, [animalId]);

    return { animal, loading, error };
};
