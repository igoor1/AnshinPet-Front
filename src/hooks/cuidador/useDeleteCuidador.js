import { useState } from 'react';
import api from '../../services/api';

export const useDeleteCuidador = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const deleteCuidador = async (cuidadorId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.delete(`/usuarios/${cuidadorId}`);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar cuidador';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteCuidador, loading, error, success };
};
