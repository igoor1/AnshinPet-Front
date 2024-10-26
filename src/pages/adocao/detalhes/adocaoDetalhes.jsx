import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Badge } from 'react-bootstrap';


import Loading from "../../../components/loading/loading";

import { useFetchAnimalForId } from "../../../hooks/animal/useFetchAnimalForId";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import NavbarHeader from "../../../components/navbar/noAuth/navbarheader";
import Footer from "../../../components/footer/footer";

import "./adocaoDetalhes.scss"


const AdocaoDetalhes = () => {
    useEffect(() => {
        document.title = 'Adoção | Detalhes | Anshin Pet';
    }, []);

    const { animalId } = useParams();
    const { animal, error, loading } = useFetchAnimalForId(animalId)

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    const getAdocao = (animal) => {
        switch (animal.adocao) {
            case 'S':
                return 'Sim';
            case 'N':
                return 'Não'
            default:
                return 'erro';
        }
    }

    const getTipo = (animal) => {
        switch (animal.tipo) {
            case 'C':
                return 'Cachorro';
            case 'G':
                return 'Gato';
            case 'A':
                return 'Ave';
            default:
                return 'Erro';
        }
    }

    const getCastrado = (animal) => {
        switch (animal.castrado) {
            case 'S':
                return 'Sim';
            case 'N':
                return 'Não';
            default:
                return 'Erro';
        }
    }

    const getSexo = (animal) => {
        switch (animal.sexo) {
            case 'M':
                return 'Macho';
            case 'F':
                return 'Fêmea';
            default:
                return 'Erro';
        }
    }

    const getPorte = (animal) => {
        switch (animal.porte) {
            case 'P':
                return 'Pequeno';
            case 'M':
                return 'Médio';
            case 'G':
                return 'Grande';
            default:
                return 'Erro';
        }
    }

    return (
        <div className="divMain">
            <NavbarHeader />
            <div className="containerMain">
                <div className="container mt-3 containerAdocao">
                    <div className="row">
                        <div className="col">
                            <img src={animal.foto} className="rounded" />

                        </div>
                        <div className="col">
                            <span className="m-3">
                                <h2>{animal.nome}</h2>
                                <p>Tipo:  {getTipo(animal)}</p>
                                <p>Raça: {animal.raca}</p>
                                <p>Sexo: {getSexo(animal)}</p>
                                <p>Data de nascimento: {animal.data}</p>
                                <p>Cor: {animal.cor}</p>
                                <p>Porte: {getPorte(animal)}</p>
                                <Badge bg="primary" className="me-2">Castrado:  {getCastrado(animal)}</Badge>
                                <Badge bg="success">Adoção: {getAdocao(animal)}</Badge>
                            </span>
                        </div>
                    </div>
                    <hr></hr>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default AdocaoDetalhes