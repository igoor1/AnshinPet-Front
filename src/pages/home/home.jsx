import { useEffect } from "react";
import { Carousel, Image, Row, Card, Col, Container } from "react-bootstrap";

import Img1 from "../../assets/carousel1.svg"
import Img2 from "../../assets/carousel2.svg"
import Img3 from "../../assets/carousel3.svg"

import ImgContainerTop from "../../assets/teste.svg"
import ImgContainerBottom from "../../assets/teste2.svg"
import ImgDoar from "../../assets/doar.svg"

import iconHouse from "../../assets/icons/houseHeart.svg"
import iconDogEat from "../../assets/icons/dogEat.svg"
import iconDogMedicals from "../../assets/icons/dogMedicals.svg"


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

            <Container>
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

                <div className="containerInfoHome">
                    <div className="cardMain">
                        <h4 className="my-3">Adote, Ame, Transforme Vidas</h4>
                        <p>
                            Bem-vindo ao nosso abrigo! Aqui, cada animal tem uma história e um coração cheio de amor esperando por uma nova chance.
                            Ao adotar, você não só ganha um companheiro fiel, mas também oferece uma segunda oportunidade para animais que já enfrentaram desafios.
                        </p>
                    </div>
                </div>
            </Container>

            <div className="borderContainerAdotar">
                <img src={ImgContainerTop} className="svgBackground" />
            </div>

            <div className="containerAdotar">
                <h4>Porque adotar?</h4>
                <div className="containerCardAdotar">
                    <div className="cardAdotar">
                        <h5>
                            <i className="bi bi-box2-heart"></i> Salve uma vida
                        </h5>
                        <p>
                            Ao adotar, você oferece a chance de um recomeço para um animal que precisa de um lar.
                        </p>
                    </div>
                    <div className="cardAdotar">
                        <h5>
                            <i className="bi bi-person-heart"></i> Companherismo Incondicional
                        </h5>
                        <p>
                            Animais adotados são gratos e se tornam companheiros leais, prontos para encher seu lar de amor.
                        </p>
                    </div>
                    <div className="cardAdotar">
                        <h5><i className="bi bi-house-heart"></i> Reduza ao Abandono</h5>
                        <p>
                            Ao abrir sua casa para um animal, você ajuda a reduzir a superlotação de abrigos e combate o abandono.
                        </p>
                    </div>
                </div>
            </div>

            <div className="borderContainerAdotar">
                <img src={ImgContainerBottom} className="svgBackground" />
            </div>

            <Container>
                <div className="containerPorqueAdotar">
                    <div className="header">
                        <h4>Como Adotar?</h4>
                    </div>
                    <div className="footer">
                        <p>
                            Adotar é fácil e seguro. Basta escolher um dos nossos amigos disponíveis, conhecer seu histórico e preencher o formulário de interesse.Nossa equipe estará ao seu lado para garantir que você encontre o parceiro ideal!
                        </p>
                    </div>
                </div>


                <div className="position-relative">
                    <img src={ImgDoar} alt="Descrição da imagem" className="img-fluid" />
                    <div className="overlay">
                        <h4>Doe e Faça a Diferença</h4>
                        <p>Não pode adotar agora? Você ainda pode ajudar nossos animais através de doações. Cada contribuição é essencial para continuarmos cuidando, alimentando e proporcionando cuidados médicos adequados a todos que estão conosco.</p>
                    </div>
                </div>
                <div className="textDoacoe">
                    <p>Como as suas doações ajudam:</p>
                </div>
            </Container>

            <div className="containerDoacao">
                <div className="containerCardDoacao">
                    <div className="cardDoacao">
                        <img src={iconDogEat} />
                        <h5>
                            Ração e Alimentação
                        </h5>
                        <p>
                            Comida saudável e nutritiva para nossos peludos.
                        </p>
                    </div>
                    <div className="cardDoacao">
                        <img src={iconHouse} />
                        <h5>
                            Melhorias no Abrigo
                        </h5>
                        <p>
                            Proporcionamos um ambiente seguro e confortável enquanto eles aguardam adoção.
                        </p>
                    </div>
                    <div className="cardDoacao">
                        <img src={iconDogMedicals} alt="" />
                        <h5>Cuidados Médicos</h5>
                        <p>
                            Garantimos que todos recebam vacinas, tratamentos e atenção veterinária.
                        </p>
                    </div>
                </div>
            </div>



            <Footer />



        </div>
    )
}

export default Home;