import { useState } from 'react';
import { api } from '../../services/api';

export const useEditCuidador = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const updateCuidador = async (cuidadorId, updatedCuidador) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.put(`/api/usuarios/${cuidadorId}`, updatedCuidador);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao editar cuidador';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return { updateCuidador, loading, error, success };
};
