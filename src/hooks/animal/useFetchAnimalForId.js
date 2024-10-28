import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import imgDefault from "../../assets/imgDefault.png";


export const useFetchAnimalForId = (animalId) => {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAnimalForId = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/animais/${animalId}`);
            const animalData = response.data;


            try {
                const fotoResponse = await api.get(`/animais/${animalData.id}/foto`);
                const fotoUrl = `http://localhost:8080/api/animais/${animalData.id}/foto`;

                setAnimal({ ...animalData, foto: fotoUrl });
            } catch {
                console.warn(`(${animalData.nome}) - Foto não encontrada, usando a imagem padrão.`);
                setAnimal({ ...animalData, foto: imgDefault });
            }


        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao buscar animal';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimalForId();
    }, [animalId]);

    return { animal, loading, error, refreshAnimal: fetchAnimalForId };
};