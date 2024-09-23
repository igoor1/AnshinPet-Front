import { useState, useEffect } from 'react';
import { api } from '../../../services/api';


export const useFetchMedicals = (animalId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doencas, setDoencas] = useState([]);
    const [vacinas, setVacinas] = useState([]);


    const fetchMedicals = async () => {
        setLoading(true);
        setError(null);
        try {
            const responseDoencas = await api.get(`/animal-doencas/animal/${animalId}`);
            const responseVacinas = await api.get(`/animal-vacinas/animal/${animalId}`);

            setDoencas(responseDoencas.data);
            setVacinas(responseVacinas.data);
        } catch (err) {
            setError('Erro ao buscar doenças e vacinas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicals();
    }, [animalId]);

    return { doencas, vacinas, loading, error, refreshMedicals: fetchMedicals };
}