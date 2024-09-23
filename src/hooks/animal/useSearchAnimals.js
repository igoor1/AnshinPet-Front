import { useState, useEffect } from 'react';
import api from '../../services/api'

export const useSearchAnimals = (initialAnimals) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAnimals, setFilteredAnimals] = useState(initialAnimals);

    useEffect(() => {
        setFilteredAnimals(initialAnimals);
    }, [initialAnimals]);

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term) {
            try {
                const response = await api.get(`http://localhost:8080/animais/listar/${term}`);
                setFilteredAnimals(response.data);
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
