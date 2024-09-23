import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const useEditAnimal = (animalId) => {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimal = async () => {
            if (!animalId) return;

            try {
                const response = await api.get(`/animais/${animalId}`);
                setAnimal(response.data);
            } catch (err) {
                setError('Erro ao buscar animal');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [animalId]);

    const updateAnimal = async (updatedAnimal) => {
        try {
            await api.put(`/animais/${animalId}`, updatedAnimal);
            setAnimal(updatedAnimal); // Atualiza o estado local com os dados editados
        } catch (err) {
            setError('Erro ao atualizar animal');
            throw err; // Para que possamos capturar o erro em outro lugar
        }
    };

    return { animal, loading, error, updateAnimal };
};
