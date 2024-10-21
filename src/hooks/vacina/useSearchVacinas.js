import { useState, useEffect } from 'react';
import api from '../../services/api'

export const useSearchVacinas = (initialVacinas) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVacinas, setFilteredVacinas] = useState(initialVacinas);

    useEffect(() => {
        setFilteredVacinas(initialVacinas);
    }, [initialVacinas]);

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term) {
            try {
                const response = await api.get(`/vacinas/listar/${term}`);
                setFilteredVacinas(response.data);
            } catch (err) {
                console.error('Erro ao buscar vacinas:', err);
                setFilteredVacinas([]);
            }
        } else {
            setFilteredVacinas(initialVacinas);
        }
    };

    return { searchTerm, filteredVacinas, handleSearch };
};
