import { Stack, Form, InputGroup, Button } from 'react-bootstrap';

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbarheader/navbarheader";
import AnimalCard from '../../components/animal/animalCard';

import './animal.scss';

const Animal = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <NavbarHeader />
            <div className="container" style={{ flex: '1' }}>
                <Stack direction="horizontal" gap={3}>

                    <div className="p-2">
                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                            Busque pelo nome
                        </Form.Label>
                        <InputGroup className="mb-2 AreaInputSearch">
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                            <Form.Control id="inlineFormInputGroup" placeholder="Busque pelo nome" />
                        </InputGroup>
                    </div>

                    <div className="p-2 ms-auto">
                        <Button variant="success btnCadastrarAnimal"><i className="bi bi-plus"></i> Cadastrar</Button>
                    </div>


                    <div className="floating">
                        <Button variant="success"><i className="bi bi-plus"></i></Button>
                    </div>

                </Stack>

                <div className='areaAnimal'>
                    <AnimalCard />
                    <AnimalCard />
                    <AnimalCard />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Animal