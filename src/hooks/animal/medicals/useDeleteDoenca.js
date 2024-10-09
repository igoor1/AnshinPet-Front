import { useState } from 'react';
import api from '../../../services/api';

export const useDeleteDoenca = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const deleteDoenca = async (doencaId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.delete(`/animal-doencas/${doencaId}`);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar doença';
            setError(errorMensagem);
            return errorMensagem;
        } finally {
            setLoading(false);
        }
    };

    return { deleteDoenca, loading, error, success };
};
