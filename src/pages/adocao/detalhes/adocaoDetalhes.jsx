import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

import Loading from "../../../components/loading/loading";

import { useFetchAnimalForId } from "../../../hooks/animal/useFetchAnimalForId";
import { ModalCreate } from "../../../components/adocao/modal/modalCreate";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import NavbarHeader from "../../../components/navbar/noAuth/navbarheader";
import Footer from "../../../components/footer/footer";

import "./adocaoDetalhes.scss"
import { Button } from "react-bootstrap";


const AdocaoDetalhes = () => {
    useEffect(() => {
        document.title = 'Adoção | Detalhes | Anshin Pet';
    }, []);

    const { animalId } = useParams();
    const { animal, error, loading } = useFetchAnimalForId(animalId)
    const { openModalCreate } = ModalCreate(animal);

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
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
                return 'Castrado';
            case 'N':
                return 'Não Castrado';
            default:
                return 'Erro';
        }
    }

    const getColorCastrado = (animal) => {
        switch (animal.castrado) {
            case 'S':
                return 'badgeYesDetalhes';
            case 'N':
                return 'badgeNoDetalhes';
            default:
                return
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

    const getFormatTextTitle = (animal) => {
        switch (animal.sexo) {
            case 'M':
                return `Interessado em adotar o ${animal.nome}?`;
            case 'F':
                return `Interessado em adotar a ${animal.nome}?`;
        }
    }

    const getFormatTextSubtitle = (animal) => {
        switch (animal.sexo) {
            case 'M':
                return `Cadastre-se para manifestar seu interesse e venha conhecê-lo em uma visita!`;
            case 'F':
                return `Cadastre-se para manifestar seu interesse e venha conhecê-la em uma visita!`;
        }
    }

    const calcularIdade = (dataNascimento) => {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();

        const anos = differenceInYears(hoje, nascimento);
        const meses = differenceInMonths(hoje, nascimento) % 12;
        const dias = differenceInDays(hoje, new Date(hoje.getFullYear(), hoje.getMonth(), nascimento.getDate())) % 30;

        return `${anos} anos, ${meses} meses e ${dias} dias`;
    }

    return (
        <div className="divMain">
            <NavbarHeader />
            <div className="containerMain">
                <div className="container mt-3">
                    <div className="row justify-content-between">
                        <div className="col-md-4 col-lg-6">
                            <div className="cardAnimalAdocaoDetalhes">
                                <div className="header">
                                    <img src={animal.foto} className="rounded" />
                                </div>
                                <div className="body">
                                    <h4 className="title">{animal.nome}</h4>
                                    <p className="subTitle">{getTipo(animal)}</p>

                                    <div className="badgeContainerDetalhes">
                                        <span className={getColorCastrado(animal)}>{getCastrado(animal)}</span>
                                    </div>
                                    <p>Raça: {animal.raca}</p>
                                    <p>Sexo: {getSexo(animal)}</p>
                                    <p>Idade: {calcularIdade(animal.data)}</p>
                                    <p>Cor: {animal.cor}</p>
                                    <p>Porte: {getPorte(animal)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <div className="mensagemAdocaoDetalhes">
                                <div className="areaTitle">
                                    <h4>{getFormatTextTitle(animal)}</h4>
                                </div>
                                <div className="areaSubtitle">
                                    <p>{getFormatTextSubtitle(animal)}</p>
                                </div>
                            </div>

                            <div className="areaBtnInteresseAdocao">
                                <Button variant="primary" onClick={() => openModalCreate(animal)}>Cadastrar Interesse</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default AdocaoDetalhes