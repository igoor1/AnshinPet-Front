import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const useEditVacina = (vacinaId) => {
    const [vacina, setVacina] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacina = async () => {
            if (!vacinaId) return;

            try {
                const response = await api.get(`/vacinas/${vacinaId}`);
                setVacina(response.data);
            } catch (err) {
                setError('Erro ao buscar vacina');
            } finally {
                setLoading(false);
            }
        };

        fetchVacina();
    }, [vacinaId]);

    const updateVacina = async (updatedVacina) => {
        try {
            await api.put(`/vacinas/${vacinaId}`, updatedVacina);
            setVacina(updatedVacina);
        } catch (err) {
            setError('Erro ao atualizar doença');
            throw err;
        }
    };

    return { vacina, loading, error, updateVacina };
};
