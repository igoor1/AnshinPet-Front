import { useState } from 'react';
import { Stack, Form, InputGroup, Button } from 'react-bootstrap';

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbarheader/navbarheader";
import AnimalCard from '../../components/animal/card/animalCard';

import './animal.scss';

import { useFetchAnimals } from '../../hooks/animal/useFetchAnimals';
import { useSearchAnimals } from '../../hooks/animal/useSearchAnimals';
import Loading from '../../components/loading/loading';
import Swal from 'sweetalert2/dist/sweetalert2.js'



const Animal = () => {
    const { animals, loading, error, refreshAnimals } = useFetchAnimals();
    const { searchTerm, filteredAnimals, handleSearch } = useSearchAnimals(animals);

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    return (
        <div className='divMain'>

            <NavbarHeader />
            <div className="container" style={{ flex: '1' }}>
                <Stack direction="horizontal" gap={3}>

                    <div className="p-2">
                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                            Busque pelo nome
                        </Form.Label>
                        <InputGroup className="mb-2 AreaInputSearch">
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                            <Form.Control id="inlineFormInputGroup" placeholder="Busque pelo nome" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
                        </InputGroup>
                    </div>

                    <div className="p-2 ms-auto">
                        <Button variant="success btnCadastrarAnimal" onClick={() => openForm()}><i className="bi bi-plus"></i> Cadastrar</Button>
                    </div>


                    <div className="floating">
                        <Button variant="success" onClick={() => openForm()}><i className="bi bi-plus"></i></Button>
                    </div>

                </Stack>

                <div className='areaAnimal'>
                    {filteredAnimals.length === 0 ? (
                        <p>Nenhum animal encontrado.</p>
                    ) : (
                        filteredAnimals.map((animal) => (
                            <AnimalCard animal={animal} key={animal.id} />
                        ))
                    )}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Animal