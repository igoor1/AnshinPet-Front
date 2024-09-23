import { useState, useEffect } from 'react';
import { api } from '../../../services/api';

export const useEditMedicalDoenca = (doencaId) => {

    const [doenca, setDoenca] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoenca = async () => {
            if (!doencaId) return;

            try {
                const response = await api.get(`/animal-doencas/${doencaId}`);
                setDoenca(response.data);
            } catch (err) {
                setError('Erro ao buscar doença');
            } finally {
                setLoading(false);
            }
        };

        fetchDoenca();
    }, [doencaId]);

    const updatedDoenca = async (updatedDoencaData) => {
        try {
            const response = await api.put(`/animal-doencas/${doencaId}`, updatedDoencaData);
            setDoenca(response.data);
        } catch (err) {
            setError('Erro ao atualizar doença');
            throw err;
        }
    };

    return { doenca, loading, error, updatedDoenca };
};
