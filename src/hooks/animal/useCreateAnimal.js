import { useState } from 'react';
import api from '../../services/api';

export const useCreateAnimal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createAnimal = async (newAnimal) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post('/animais', newAnimal);

            if (newAnimal.foto) {
                const animalId = response.data.id;
                const animalName = response.data.nome;
                const fotoName = `Foto: ${animalName}`

                const formData = new FormData();
                formData.append('arquivo', newAnimal.foto);
                formData.append('descricao', fotoName);

                await api.put(`/animais/${animalId}/foto`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }

            setSuccess(true);
        } catch (err) {
            setError('Erro ao cadastrar animal');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createAnimal, loading, error, success };
};
