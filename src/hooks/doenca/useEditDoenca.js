import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const useEditDoenca = (doencaId) => {
    const [doenca, setDoenca] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoenca = async () => {
            if (!doencaId) return;

            try {
                const response = await api.get(`/doencas/${doencaId}`);
                setDoenca(response.data);
            } catch (err) {
                setError('Erro ao buscar doenca');
            } finally {
                setLoading(false);
            }
        };

        fetchDoenca();
    }, [doencaId]);

    const updateDoenca = async (updatedDoenca) => {
        try {
            await api.put(`/doencas/${doencaId}`, updatedDoenca);
            setDoenca(updatedDoenca);
        } catch (err) {
            setError('Erro ao atualizar doença');
            throw err;
        }
    };

    return { doenca, loading, error, updateDoenca };
};
