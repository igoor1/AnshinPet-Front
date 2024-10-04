import { Button, Image, Badge, Card } from 'react-bootstrap';

import ImgDefaultAnimal from "../../assets/imgDefault.png";

import './animalCard.scss';

const AnimalCard = () => {
    return (
        <div className='itemAnimal'>

            <Card className="text-center cardAnimal">
                <Card.Header>
                    <div className='headerAnimal'>
                        <div>
                            <Image src={ImgDefaultAnimal} alt="Imagem padrão (animal)" className='imagemAnimal' />
                            <p style={{ margin: 'auto' }}> Rex <span className='tipoAnimal'>(Cachorro)</span></p>
                            <Badge bg="success">Adoção: Sim</Badge>
                        </div>
                        <div className='infoAnimal'>
                            <p >
                                Raça: Vira Lata
                            </p>
                            <p >
                                Castrado: Não
                            </p>
                            <p >
                                Cor: vermelho
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

/* 
Versão Vertical
<div className='itemAnimal'>

                <Card className="text-center cardAnimal">
                    <Card.Header>
                        <Image src={ImgDefaultAnimal} alt="Imagem padrão (animal)" className='imagemAnimal' />
                        <p style={{ margin: 'auto' }}> Hikari <span className='tipoAnimal'>(Gato)</span></p>
                        <Badge bg="success">Adoção: Sim</Badge>
                    </Card.Header>
                    <Card.Body>
                        <p style={{ margin: 'auto' }}>
                            Raça: Vira Lata
                        </p>
                        <p style={{ margin: 'auto' }}>
                            Castrado: Não
                        </p>
                        <p style={{ margin: 'auto' }}>
                            Cor: preto
                        </p>

                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button variant="primary" className='m-1'><i className="bi bi-heart"></i></Button>
                        <Button variant="danger" className='m-1'><i className="bi bi-trash"></i></Button>
                        <Button variant="success" className='m-1'><i className="bi bi-pencil"></i></Button>
                    </Card.Footer>
                </Card>
            </div>



            SCSS
            
.cardAnimal {
    .card-header {
        background-color: white;
    }

    .card-footer {
        background-color: white;
    }

    .imagemAnimal {
        max-width: 90px;
        max-height: 90px;
    }

    .tipoAnimal {
        color: gray;
        font-size: 15px;
        font-style: italic;
    }
}

*/