import { useState, useEffect } from 'react';
import api from '../../services/api'

export const useSearchDoencas = (initialDoencas) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoencas, setFilteredDoencas] = useState(initialDoencas);

    useEffect(() => {
        setFilteredDoencas(initialDoencas);
    }, [initialDoencas]);

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term) {
            try {
                const response = await api.get(`/doencas/listar/${term}`);
                setFilteredDoencas(response.data);
            } catch (err) {
                console.error('Erro ao buscar doenças:', err);
                setFilteredDoencas([]);
            }
        } else {
            setFilteredDoencas(initialDoencas);
        }
    };

    return { searchTerm, filteredDoencas, handleSearch };
};
