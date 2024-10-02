import { useState, useEffect } from 'react';
import api from '../../services/api'

export const useFetchDoacaoForType = (initialDoacoes) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoacoes, setFilteredDoacoes] = useState(initialDoacoes);

    useEffect(() => {
        setFilteredDoacoes(initialDoacoes);
    }, [initialDoacoes]);

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term) {
            try {
                const response = await api.get(`/doacoes/listar/${term}`);
                setFilteredDoacoes(response.data);
            } catch (err) {
                console.error('Erro ao buscar doações:', err);
                setFilteredDoacoes([]);
            }
        } else {
            setFilteredDoacoes(initialDoacoes);
        }
    };

    return { searchTerm, filteredDoacoes, handleSearch };
};
