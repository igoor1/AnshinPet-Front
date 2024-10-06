import { Button, Image, Badge, Card } from 'react-bootstrap';

import ImgDefaultAnimal from "../../../assets/imgDefault.png";

import './animalCard.scss';

const AnimalCard = ({ animal }) => {

    const getColorAdocao = (animal) => {
        switch (animal.adocao) {
            case 'Sim':
                return 'success';
            case 'Não':
                return 'danger';
            default:
                return 'warning'
        }
    }

    return (
        <div className='itemAnimal'>

            <Card className="text-center cardAnimal">
                <Card.Header>
                    <div className='headerAnimal'>
                        <div>
                            <Image src={ImgDefaultAnimal} alt="Imagem padrão (animal)" className='imagemAnimal' />
                            <p style={{ margin: 'auto' }}> {animal.nome} <span className='tipoAnimal'>({animal.tipo})</span></p>
                            <Badge bg={getColorAdocao(animal)}>Adoção: {animal.adocao}</Badge>
                        </div>
                        <div className='infoAnimal'>
                            <p >
                                Raça: {animal.raca}
                            </p>
                            <p >
                                Castrado: {animal.castrado}
                            </p>
                            <p >
                                Cor: {animal.cor}
                            </p>

                        </div>
                    </div>
                </Card.Header>
                <Card.Footer className="text-muted">
                    <Button variant="primary" className='m-1'><i className="bi bi-heart"></i></Button>
                    <Button variant="danger" className='m-1'><i className="bi bi-trash"></i></Button>
                    <Button variant="success" className='m-1'><i className="bi bi-pencil"></i></Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default AnimalCard