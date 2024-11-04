import { Container, Nav, Navbar, NavDropdown, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import './navbarheader.scss'

import useLogoutUser from '../../../hooks/login/useLogoutUser';

import Logo from '../../../assets/logoMinimal.svg';
import Perfil from '../../../assets/perfilDefault.svg'

const NavbarHeader = () => {
    const { logout } = useLogoutUser();

    return (
        <Navbar collapseOnSelect expand="lg" className='my-navbar-theme p-2' data-bs-theme="primary">
            <Container fluid>
                <Navbar.Brand>
                    <Image src={Logo} alt="Logo" roundedCircle className='logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-2">
                        <Nav.Link href="/admin/dashboard"><i className="bi bi-house-door"></i> Home</Nav.Link>
                        <Nav.Link href="/admin/animais"><i className="bi bi-mailbox"></i> Animais</Nav.Link>
                        <NavDropdown title={<span><i className="bi bi-heart-pulse"></i> Cuidados Médicos</span>} id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/admin/doencas"><i className="bi bi-backpack4"></i> Doenças</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/vacinas"><i className="bi bi-eyedropper"></i> Vacinas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/admin/doacoes"><i className="bi bi-archive"></i> Doações</Nav.Link>
                        <Nav.Link href="/admin/cuidadores"><i className="bi bi-people"></i> Cuidadores</Nav.Link>
                    </Nav>
                    <Nav>
                        <DropdownButton
                            align={{ lg: 'end' }}
                            id="dropdown-menu-align-responsive-1"
                            title={<Image src={Perfil} alt="Foto do Perfil" className='ImagemUsuario' roundedCircle />}
                        >
                            <Dropdown.Item href="/admin/configuracoes"><i className="bi bi-gear"></i> Configurações</Dropdown.Item>
                            <NavDropdown.Divider />
                            <Dropdown.Item onClick={logout}><i className="bi bi-arrow-left-square"></i> Logout</Dropdown.Item>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader;