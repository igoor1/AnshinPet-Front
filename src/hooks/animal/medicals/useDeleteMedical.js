import { useState } from 'react';
import api from '../../../services/api';

export const useDeleteMedical = () => {
    const [loadingDoenca, setLoadingDoenca] = useState(false);
    const [errorDoenca, setErrorDoenca] = useState(null);

    const [loadingVacina, setLoadingVacina] = useState(false);
    const [errorVacina, setErrorVacina] = useState(null);


    const deleteDoenca = async (idDoenca) => {
        setLoadingDoenca(true);
        setErrorDoenca(null);
        try {
            await api.delete(`/animal-doencas/${idDoenca}`);
            return null;
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar doença do animal';
            setErrorDoenca(errorMensagem);
            return errorMensagem;
        } finally {
            setLoadingDoenca(false);
        }
    };
    const deleteVacina = async (idVacina) => {
        setLoadingVacina(true);
        setErrorVacina(null);
        try {
            await api.delete(`/animal-vacinas/${idVacina}`);
            return null;
        } catch (err) {
            const errorMensagem = err.response?.data?.title || 'Erro ao deletar vacina do animal';
            setErrorVacina(errorMensagem);
            return errorMensagem;
        } finally {
            setLoadingVacina(false);
        }
    };


    return { deleteDoenca, deleteVacina, loadingDoenca, errorDoenca, loadingVacina, errorVacina };
};
