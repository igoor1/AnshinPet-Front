import { useState } from 'react';
import api from '../../services/api';

export const useEditFoto = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const editFoto = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('arquivo', data.foto);
        formData.append('descricao', data.nome);

        try {
            await api.put(`/animais/${data.id}/foto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setSuccess(true);

        } catch (err) {
            setError(`Erro ao editar foto:  ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false)
        }
    }

    return { editFoto, loading, error, success };
};
