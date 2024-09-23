import { useState } from 'react';
import api from '../../../services/api';

export const useCreateMedical = () => {
    const [loadingDoenca, setLoadingDoenca] = useState(false);
    const [errorDoenca, setErrorDoenca] = useState(null);
    const [loadingVacina, setLoadingVacina] = useState(false);
    const [errorVacina, setErrorVacina] = useState(null);


    const createDoenca = async (newDoenca) => {
        setLoadingDoenca(true);
        setErrorDoenca(null);

        try {
            await api.post('/animal-doencas', newDoenca);
        } catch (err) {
            setErrorDoenca('Erro ao cadastrar doença do animal');
            console.error(err);
        } finally {
            setLoadingDoenca(false);
        }
    };

    const createVacina = async (newVacina) => {
        setLoadingVacina(true);
        setErrorVacina(null);

        try {
            await api.post('/animal-vacinas', newVacina);
        } catch (err) {
            setErrorVacina('Erro ao cadastrar vacina do animal');
            console.error(err);
        } finally {
            setLoadingVacina(false);
        }
    };



    return { createDoenca, loadingDoenca, errorDoenca, createVacina, loadingVacina, errorVacina };
};
