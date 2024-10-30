import { useNavigate } from "react-router-dom";
import { Button, Image } from 'react-bootstrap';

import './animalAdocaoCard.scss';

const AnimalAdocaoCard = ({ animal }) => {

    const navigate = useNavigate();

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


    return (
        <div className="cardAnimalAdocao">
            <div className="nameTop">
                {animal.nome}
            </div>


            <div className='header'>
                <Image src={animal.foto} alt="Imagem padrão" className='imagemAnimalAdocao rounded' />
            </div>


            <div className='body'>
                <div className="badgeContainer">
                    <span className={getColorCastrado(animal)}>{getCastrado(animal)}</span>

                </div>

                <div className="infoAnimalContainer">
                    <p>{getTipo(animal)}</p>
                    <p>{animal.raca}</p>
                </div>

                <div className="footer">
                    <div className="btnContainer">
                        <Button variant="primary" className='m-1' onClick={() => navigate(`/adocao/detalhes/${animal.id}`)}>Ver detalhes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimalAdocaoCard