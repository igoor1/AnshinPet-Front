import { useState, useEffect } from 'react';
import api from '../../services/api';

export const useGetQuantity = () => {
    const [animals, setAnimals] = useState();
    const [dogs, setDogs] = useState();
    const [cats, setCats] = useState();
    const [birds, setBirds] = useState();
    const [adoptions, setAdoptions] = useState();
    const [noAdoptions, setNoAdoptions] = useState();
    const [users, setUsers] = useState();
    const [donations, setDonations] = useState();
    const [money, setMoney] = useState();


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGetQuantity = async () => {
        setLoading(true);
        setError(null);
        try {
            const quantityAnimals = await api.get('/animais/quantidade');
            const quantityDogs = await api.get('/animais/quantidade/C');
            const quantityCats = await api.get('/animais/quantidade/G');
            const quantityBirds = await api.get('/animais/quantidade/A');
            const quantityNoAdoption = await api.get('/animais/quantidade/nao-disponiveis');
            const quantityAdoption = await api.get('/animais/quantidade/disponiveis');
            const quantityUsers = await api.get('/usuarios/quantidade');
            const quantityDonations = await api.get('/doacoes/quantidade/racao');
            const quantityMoney = await api.get('/doacoes/quantidade/dinheiro');

            setAnimals(quantityAnimals.data)
            setDogs(quantityDogs.data)
            setCats(quantityCats.data)
            setBirds(quantityBirds.data)
            setAdoptions(quantityAdoption.data)
            setNoAdoptions(quantityNoAdoption.data)
            setUsers(quantityUsers.data)
            setDonations(quantityDonations.data)
            setMoney(quantityMoney.data)

        } catch (err) {
            setError('Erro ao buscar valores');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGetQuantity();
    }, []);

    return { animals, dogs, cats, birds, adoptions, noAdoptions, users, donations, money, loading, error };
};
