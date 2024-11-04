import { useNavigate } from "react-router-dom";

import { Button, Image } from 'react-bootstrap';

import './animalCard.scss';

const AnimalCard = ({ animal }) => {

    const navigate = useNavigate();

    const getColorAdocao = (animal) => {
        switch (animal.adocao) {
            case 'S':
                return 'badgeYes';
            case 'N':
                return 'badgeNo';
            default:
                return 'warning'
        }
    }

    const getColorCastrado = (animal) => {
        switch (animal.castrado) {
            case 'S':
                return 'badgeYes';
            case 'N':
                return 'badgeNo';
            default:
                return
        }
    }


    const getAdocao = (animal) => {
        switch (animal.adocao) {
            case 'S':
                return 'Adoção';
            case 'N':
                return 'Não Adoção'
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
                return 'Castrado';
            case 'N':
                return 'Não Castrado';
            default:
                return 'Erro';
        }
    }

    const getNome = (animal) => {
        let nome = animal.nome;
        if (nome.length > 15) {
            return nome.slice(0, 15) + '...';
        } else {
            return nome;
        }
    }

    return (

        <div className='cardAnimal'>
            <div className="nameTop">
                {getNome(animal)}
            </div>

            <div className='header'>
                <Image src={animal.foto} alt="Imagem padrão" className='imagemAnimal rounded' />
            </div>

            <div className='body'>
                <div className="badgeContainer">
                    <span className={getColorAdocao(animal)}>{getAdocao(animal)}</span>
                    <span className={getColorCastrado(animal)}>{getCastrado(animal)}</span>
                </div>
                <div className="infoAnimalContainer">
                    <p>{getTipo(animal)}</p>
                    <p> {animal.raca}</p>
                </div>

            </div>

            <div className="footer">
                <div className="btnContainer">
                    <Button variant="primary" className='m-1' onClick={() => navigate(`/admin/animais/detalhes/${animal.id}`)}><i class="bi bi-postcard-heart"></i> Ver detalhes</Button>
                </div>
            </div>

        </div >
    )
}

export default AnimalCard