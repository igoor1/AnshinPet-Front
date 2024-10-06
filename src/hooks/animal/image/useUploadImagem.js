import { useState } from 'react';
import axios from 'axios';

export const useUploadImagem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImagem = async (imagem, id) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('arquivo', imagem);
        formData.append('descricao', 'Imagem Animal');

        try {
            await axios.put(`http://localhost:8080/animais/${id}/foto`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Erro ao fazer upload da imagem.');
        } finally {
            setLoading(false);
        }
    };

    return { uploadImagem, loading, error };
};