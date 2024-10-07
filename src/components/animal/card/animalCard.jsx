import { Button, Image, Badge, Card } from 'react-bootstrap';

import ImgDefaultAnimal from "../../../assets/imgDefault.png";
import { ModalDelete } from '../modal/modalDelete';

import './animalCard.scss';

const AnimalCard = ({ animal, refreshAnimals }) => {
    const { openModalDelete } = ModalDelete(refreshAnimals);

    const getColorAdocao = (animal) => {
        switch (animal.adocao) {
            case 'S':
                return 'success';
            case 'N':
                return 'danger';
            default:
                return 'warning'
        }
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

    return (
        <div className='itemAnimal'>

            <Card className="text-center cardAnimal">
                <Card.Header>
                    <div className='headerAnimal'>
                        <div>
                            <Image src={ImgDefaultAnimal} alt="Imagem padrão (animal)" className='imagemAnimal' />
                            <p style={{ margin: 'auto' }}> {animal.nome} <span className='tipoAnimal'>({getTipo(animal)})</span></p>
                            <Badge bg={getColorAdocao(animal)}>Adoção: {getAdocao(animal)}</Badge>
                        </div>
                        <div className='infoAnimal'>
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
                    <Button variant="primary" className='m-1'><i className="bi bi-heart"></i></Button>
                    <Button variant="danger" className='m-1' onClick={() => openModalDelete(animal.id, animal.nome)}><i className="bi bi-trash"></i></Button>
                    <Button variant="success" className='m-1'><i className="bi bi-pencil"></i></Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default AnimalCard