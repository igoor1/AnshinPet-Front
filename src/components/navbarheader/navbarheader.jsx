import { Container, Nav, Navbar, NavDropdown, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import './navbarheader.scss'

import Logo from '../../assets/logoWhite.svg';

const NavbarHeader = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg='primary' className='my-navbar-theme' data-bs-theme="dark">
            <Container>
                <Navbar.Brand><Image src={Logo} alt="Logo" style={{ width: '30px', height: '30px' }} roundedCircle /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-2">
                        <Nav.Link href="/dashboard"><i class="bi bi-house-door"></i> Home</Nav.Link>
                        <Nav.Link href="/animais"><i class="bi bi-mailbox"></i> Animais</Nav.Link>
                        <NavDropdown title={<span><i class="bi bi-heart-pulse"></i> Cuidados Médicos</span>} id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/doencas"><i class="bi bi-backpack4"></i> Doenças</NavDropdown.Item>
                            <NavDropdown.Item href="/vacinas"><i class="bi bi-eyedropper"></i> Vacinas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/doacoes"><i class="bi bi-archive"></i> Doações</Nav.Link>
                        <Nav.Link href="/cuidadores"><i class="bi bi-people"></i> Cuidadores</Nav.Link>
                    </Nav>
                    <Nav>
                        <DropdownButton
                            align={{ lg: 'end' }}
                            id="dropdown-menu-align-responsive-1"
                            title={<Image src="https://avatars.githubusercontent.com/u/89944667?v=4" alt="Logo" style={{ width: '30px', height: '30px' }} roundedCircle />}
                        >
                            <Dropdown.Item href="/configuracoes"><i class="bi bi-gear"></i> Configurações</Dropdown.Item>
                            <NavDropdown.Divider />
                            <Dropdown.Item href="/login"><i class="bi bi-arrow-left-square"></i> Logout</Dropdown.Item>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader;