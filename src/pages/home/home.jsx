import { useEffect } from "react";
import { Carousel, Image, Row, Card, Col, Container } from "react-bootstrap";

import Img1 from "../../assets/carousel1.png"
import Img2 from "../../assets/carousel2.png"
import Img3 from "../../assets/carousel3.png"

import "./home.scss";
import NavbarHeader from "../../components/navbar/noAuth/navbarheader";
import Footer from "../../components/footer/footer";


const Home = () => {
    useEffect(() => {
        document.title = 'Home | Anshin Pet';
    }, []);

    return (
        <div className="divMain">
            <NavbarHeader />
            <Container className="containerMain">

                <Carousel className="mt-3">
                    <Carousel.Item interval={3000}>
                        <Image src={Img1} className="d-block w-100 img-fluid" />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <Image src={Img2} className="d-block w-100 img-fluid" />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <Image src={Img3} className="d-block w-100 img-fluid" />
                    </Carousel.Item>
                </Carousel>

                <Container className="containerInfoHome">
                    <h4 className="my-3">Adote, Ame, Transforme Vidas</h4>
                    <p>
                        Bem-vindo ao nosso abrigo! Aqui, cada animal tem uma história e um coração cheio de amor esperando por uma nova chance.
                        Ao adotar, você não só ganha um companheiro fiel, mas também oferece uma segunda oportunidade para animais que já enfrentaram desafios.
                    </p>
                    <h5>Porque adotar?</h5>
                    <Row xs={1} md={3} className="g-4">

                        <Col>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>Salve uma Vida</Card.Title>
                                    <Card.Text>
                                        Ao adotar, você oferece a chance de um recomeço para um animal que precisa de um lar.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>Companheirismo Incondicional</Card.Title>
                                    <Card.Text>
                                        Animais adotados são gratos e se tornam companheiros leais, prontos para encher seu lar de amor.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>Reduza o Abandono</Card.Title>
                                    <Card.Text>
                                        Ao abrir sua casa para um animal, você ajuda a reduzir a superlotação de abrigos e combate o abandono.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <p className="my-3"><b className="colorPrimary">Como Adotar?</b> Adotar é fácil e seguro. Basta escolher um dos nossos amigos disponíveis, conhecer seu histórico e preencher o formulário de interesse.
                        Nossa equipe estará ao seu lado para garantir que você encontre o parceiro ideal!</p>
                </Container>

                <hr className="my-4" />

                <Container className="containerInfoHome">
                    <h4 className="my-3">Doe e Faça a Diferença</h4>
                    <p>
                        Não pode adotar agora? Você ainda pode ajudar nossos animais através de doações. Cada contribuição é essencial para continuarmos cuidando, alimentando e proporcionando cuidados médicos adequados a todos que estão conosco.
                    </p>
                    <h5>Como suas doações ajudam:</h5>
                    <Row xs={1} md={3} className="g-4">

                        <Col>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>Ração e Alimentação</Card.Title>
                                    <Card.Text>
                                        Comida saudável e nutritiva para nossos peludos.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>Cuidados Médicos</Card.Title>
                                    <Card.Text>
                                        Garantimos que todos recebam vacinas, tratamentos e atenção veterinária.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>Melhorias no Abrigo</Card.Title>
                                    <Card.Text>
                                        Proporcionamos um ambiente seguro e confortável enquanto eles aguardam adoção.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <p className="my-3">Doe agora e ajude a transformar a vida desses animais. Toda ajuda faz a diferença!</p>
                </Container>

                <hr className="my-4" />

                <Container className="containerInfoHome mb-4">
                    <h4 className="my-3">Faça Parte da Nossa Comunidade</h4>
                    <p>
                        Quer ajudar de outras formas? Seja voluntário e nos ajude a dar mais amor e cuidado a cada um dos animais que resgatamos. Junte-se a nós e descubra o poder de transformar vidas!
                    </p>
                </Container>

                <Footer />


            </Container>
        </div>
    )
}

export default Home;