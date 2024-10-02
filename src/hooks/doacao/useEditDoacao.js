import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const useEditDoacao = (doacaoId) => {
    const [doacao, setDoacao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoacao = async () => {
            if (!doacaoId) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/doacoes/${doacaoId}`);
                setDoacao(response.data);
            } catch (err) {
                setError('Erro ao buscar doação');
            } finally {
                setLoading(false);
            }
        };

        fetchDoacao();
    }, [doacaoId]);

    const updateDoacao = async (updatedDoacao) => {
        try {
            await api.put(`/doacoes/${doacaoId}`, updatedDoacao);
            setDoacao(updatedDoacao);
        } catch (err) {
            setError('Erro ao atualizar doação');
            throw err;
        }
    };

    return { doacao, loading, error, updateDoacao };
};
