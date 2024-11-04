import { useState, useEffect } from 'react';
import api from '../../services/api';
import imgDefault from "../../assets/imgDefault.png";
import photoURL from '../../services/photoURL';

export const useFetchAnimals = (page = 0, size = 12) => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingImg, setLoadingImg] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        totalItens: 0,
        totalPaginas: 0,
        paginaAtual: page,
    })
    const { usePhoto } = photoURL();

    const fetchAnimals = async (pageNumber = 0, pageSize = 12) => {
        setLoading(true);
        setLoadingImg(true);
        setError(null);
        try {
            const response = await api.get('/animais', {
                params: { size: pageSize, page: pageNumber }
            });
            const data = response.data;

            const animalsFotoPromise = data.conteudo.map(async (animal) => {
                try {
                    const response = await api.get(`/animais/${animal.id}/foto`);

                    const fotoUrl = await usePhoto(animal.id);

                    return {
                        ...animal,
                        foto: fotoUrl
                    }
                } catch (err) {
                    console.warn(`(${animal.nome}) - Foto não encontrada, usando a imagem padrão.`);
                    return {
                        ...animal,
                        foto: imgDefault
                    }
                }
            });

            const animaisFoto = await Promise.all(animalsFotoPromise);
            setAnimals(animaisFoto);
            setPagination({
                totalItens: data.totalItens,
                totalPaginas: data.totalPaginas,
                paginaAtual: data.paginaAtual
            })
            setLoadingImg(false);

        } catch (err) {
            setError('Erro ao buscar animais');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimals(page, size);
    }, [page, size]);

    return { animals, loading, loadingImg, error, pagination, refreshAnimals: fetchAnimals };
};
