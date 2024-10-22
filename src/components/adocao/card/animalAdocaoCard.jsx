import { useNavigate } from "react-router-dom";
import { Button, Image, Card } from 'react-bootstrap';

import './animalAdocaoCard.scss';


const AnimalAdocaoCard = ({ animal }) => {

    const navigate = useNavigate();

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


    return (
        <div className='itemAnimalAdocao'>

            <Card className="text-center cardAnimalAdocao">
                <Card.Header>
                    <div className='headerAnimalAdocao'>
                        <div>
                            <Image src={animal.foto} alt="Imagem padrão" className='imagemAnimalAdocao rounded' />
                            <p style={{ margin: 'auto' }}> {animal.nome} <span className='tipoAnimalAdocao'>({getTipo(animal)})</span></p>
                        </div>
                        <div className='infoAnimalAdocao'>
                            <p >
                                Raça: {animal.raca}
                            </p>
                            <p >
                                Castrado: {getCastrado(animal)}
                            </p>
                            <p >
                                Cor: {animal.cor}
                            </p>
                        </div>

                    </div>
                </Card.Header>
                <Card.Footer className="text-muted">
                    <Button variant="primary" className='m-1' onClick={() => navigate(`/adocao/detalhes/${animal.id}`)}>Ver detalhes</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default AnimalAdocaoCard