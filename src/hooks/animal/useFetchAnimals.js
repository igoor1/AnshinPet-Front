import { useState, useEffect } from 'react';
import api from '../../services/api';
import imgDefault from "../../assets/imgDefault.png";

export const useFetchAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnimalPhoto = async (animalId) => {
        try {
            const response = await api.get(`/animais/${animalId}/foto`);

            if (response.data && response.data.nomeArquivo) {
                return `http://localhost:8080/api/animais/${animalId}/foto`;
            }

            return null;
        } catch (err) {
            return null;
        }
    };

    const fetchAnimals = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/animais');
            const animalsWithPhotos = await Promise.all(
                response.data.map(async (animal) => {
                    const photoUrl = await fetchAnimalPhoto(animal.id);
                    return {
                        ...animal,
                        foto: photoUrl || imgDefault,
                    };
                })
            );

            setAnimals(animalsWithPhotos);
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
