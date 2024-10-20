import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import './navbarheader.scss'

import Logo from '../../../assets/logoWhite.svg';

const NavbarHeader = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg='primary' className='my-navbar-theme p-2' data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand>
                    <Image src={Logo} alt="Logo" roundedCircle className='logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-2">
                        <Nav.Link href="/"><i className="bi bi-house-door"></i> Home</Nav.Link>
                        <Nav.Link href="/animais"><i className="bi bi-mailbox"></i> Animais para Adoção</Nav.Link>
                        <Nav.Link href="/doar"><i className="bi bi-box2-heart"></i> Doar</Nav.Link>
                        <Nav.Link href="/sobre"><i className="bi bi-people"></i> Sobre nós</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader;