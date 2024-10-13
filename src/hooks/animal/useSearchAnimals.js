import { useState, useEffect } from 'react';
import api from '../../services/api'
import imgDefault from "../../assets/imgDefault.png"

export const useSearchAnimals = (initialAnimals) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAnimals, setFilteredAnimals] = useState(initialAnimals);

    useEffect(() => {
        setFilteredAnimals(initialAnimals);
    }, [initialAnimals]);

    const fetchAnimalPhoto = async (animalId) => {
        try {
            const response = await api.get(`/animais/${animalId}/foto`);

            if (response.data && response.data.nomeArquivo) {
                return `http://localhost:8080/animais/${animalId}/foto`;
            }

            return null;
        } catch (err) {
            return null;
        }
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term) {
            try {
                const response = await api.get(`http://localhost:8080/animais/listar/${term}`);
                const animalsWithPhotos = await Promise.all(
                    response.data.map(async (animal) => {
                        const photoUrl = await fetchAnimalPhoto(animal.id);
                        return {
                            ...animal,
                            foto: photoUrl || imgDefault,
                        };
                    })
                );

                setFilteredAnimals(animalsWithPhotos);
            } catch (err) {
                console.error('Erro ao buscar animais:', err);
                setFilteredAnimals([]);
            }
        } else {
            setFilteredAnimals(initialAnimals);
        }
    };

    return { searchTerm, filteredAnimals, handleSearch };
};
