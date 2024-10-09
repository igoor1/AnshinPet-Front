import { useState } from 'react';
import { api } from '../../services/api';

export const useEditVacina = (vacinaId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const updateVacina = async (vacinaId, updatedVacina) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.put(`/vacinas/${vacinaId}`, updatedVacina);
            setSuccess(true);
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao editar vacina';
            setError(errorMensagem);
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return { updateVacina, loading, error, success };
};
