import { useEffect, useState } from "react"
import NavbarHeader from "../../components/navbar/noAuth/navbarheader";
import Footer from "../../components/footer/footer";
import { Nav, Breadcrumb, useAccordionButton } from "react-bootstrap";

import CardFade from "../../components/sobre/cardFade";


import "./sobre.scss";

const Sobre = () => {
    useEffect(() => {
        document.title = 'Sobre nós | Anshin Pet';
    }, []);


    const [open0, setOpen0] = useState(true);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    const handleOpen = (num) => {
        setOpen0(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);

        switch (num) {
            case 0:
                setOpen0(true);
                break;
            case 1: setOpen1(true);
                break;
            case 2: setOpen2(true);
                break;
            case 3: setOpen3(true);
                break;
            case 4: setOpen4(true);
                break;
        }
    }

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                type="button"
                style={{ backgroundColor: 'pink' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    return (
        <div className="divMain">
            <NavbarHeader />
            <Breadcrumb className='mt-3 px-4'>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Sobre nós</Breadcrumb.Item>
            </Breadcrumb>

            <div className="containerMain">
                <div className="container divSobre">
                    <div className="row">

                        <div className="col-auto">
                            <Nav variant="pills" defaultActiveKey="active" className="navSobre">
                                <Nav.Item>
                                    <Nav.Link eventKey="active" onClick={() => handleOpen(0)}
                                        aria-controls="example-collapse-text0"
                                        aria-expanded={open0}>Quem Somos ?</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={() => handleOpen(1)}
                                        aria-controls="example-collapse-text1"
                                        aria-expanded={open1}>Nossa Missão</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="link-2" onClick={() => handleOpen(2)}
                                        aria-controls="example-collapse-text2"
                                        aria-expanded={open2}>Nossa Visão</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="link-3" onClick={() => handleOpen(3)}
                                        aria-controls="example-collapse-text3"
                                        aria-expanded={open3}>Nossos Valores</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="link-4" onClick={() => handleOpen(4)}
                                        aria-controls="example-collapse-text4"
                                        aria-expanded={open4}>Onde Estamos ?</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>

                        <div className="col">
                            <CardFade id="example-collapse-text0" open={open0} text="Somos um abrigo comprometido em proporcionar cuidado, amor e dignidade aos animais resgatados. Nosso trabalho vai além de oferecer um lar temporário; buscamos preparar nossos animais para uma adoção responsável, educando a comunidade sobre a importância do respeito e da proteção animal. Com uma equipe dedicada e apaixonada, estamos sempre em busca de soluções para melhorar a vida dos animais em situação de vulnerabilidade." />
                            <CardFade id="example-collapse-text1" open={open1} text="Nossa missão é resgatar, cuidar e reabilitar animais abandonados, proporcionando-lhes um ambiente seguro e amoroso até que encontrem um lar definitivo. Acreditamos que cada animal merece uma segunda chance e trabalhamos incansavelmente para que eles possam encontrar famílias que os amem e respeitem." />
                            <CardFade id="example-collapse-text2" open={open2} text="Nossa visão é um mundo onde todos os animais sejam respeitados, protegidos e amados, livres do abandono e da violência. Queremos ser referência em práticas de cuidado animal e adoção responsável, promovendo uma sociedade mais consciente e comprometida com o bem-estar dos animais." />
                            <CardFade id="example-collapse-text3" open={open3} text="Nossos valores são fundamentados no respeito à vida e na dedicação aos animais, oferecendo a cada um deles um cuidado digno e responsável. Atuamos com ética e transparência, garantindo o uso consciente dos recursos. Nosso compromisso se reflete na paixão da nossa equipe, que trabalha para reabilitar os animais e prepará-los para novos lares. Acreditamos também na importância da educação e conscientização, essenciais para promover uma sociedade mais compassiva e protetora dos animais." />
                            <CardFade id="example-collapse-text4" open={open4} text="Nosso abrigo está localizado em Diadema, na rua: Luiz Merenda, 443. Estamos de portas abertas para visitas e adoções, seguindo todas as orientações de segurança. Venha nos conhecer e fazer parte da transformação na vida de animais que esperam por uma nova chance." />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Sobre
