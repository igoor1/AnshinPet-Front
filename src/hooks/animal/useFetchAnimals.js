import { useState, useEffect } from 'react';
import api from '../../services/api';
import imgDefault from "../../assets/imgDefault.png";

export const useFetchAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnimals = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/animais');
            const animals = response.data;

            const animalsFotoPromise = animals.map(async (animal) => {
                try {
                    const response = await api.get(`/animais/${animal.id}/foto`);

                    const fotoUrl = `http://localhost:8080/api/animais/${animal.id}/foto`;
                    return {
                        ...animal,
                        foto: fotoUrl
                    }
                } catch (err) {
                    console.warn(`(${animal.nome}) - Foto não encontrada, usando a imagem padrão.`);
                    return {
                        ...animal,
                        foto: imgDefault
                    }
                }
            });

            const animaisFoto = await Promise.all(animalsFotoPromise);
            setAnimals(animaisFoto);

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
