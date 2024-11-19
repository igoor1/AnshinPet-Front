import { useEffect, useState } from 'react';
import { Stack, Form, InputGroup, Button, Breadcrumb } from 'react-bootstrap';
import './animal.scss';

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbar/auth/navbarheader";
import AnimalCard from '../../components/animal/card/animalCard';
import { ModalCreate } from '../../components/animal/modal/modalCreate';

import { useFetchAnimals } from '../../hooks/animal/useFetchAnimals';
import { useSearchAnimals } from '../../hooks/animal/useSearchAnimals';
import Loading from '../../components/loading/loading';

import Swal from 'sweetalert2/dist/sweetalert2.js'

const Animal = () => {
    useEffect(() => {
        document.title = 'Animal | Anshin Pet';
    }, []);

    const [page, setPage] = useState(0);


    const { animals, loading, loadingImg, error, pagination, refreshAnimals } = useFetchAnimals(page);
    const { searchTerm, filteredAnimals, handleSearch } = useSearchAnimals(animals);
    const { openModalCreate } = ModalCreate(refreshAnimals);

    if (loading || loadingImg) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 0; i < pagination.totalPaginas; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === pagination.paginaAtual ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className='divMain'>

            <NavbarHeader />
            <Breadcrumb className='mt-3 px-4'>
                <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Animais</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container containerMain">
                <Stack direction="horizontal" gap={3}>

                    <div className="p-2">
                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                            Busque pelo nome
                        </Form.Label>
                        <InputGroup className="mb-2 AreaInputSearch">
                            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                            <Form.Control id="inlineFormInputGroup" className="inputSearchBase" placeholder="Busque pelo nome" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
                        </InputGroup>
                    </div>

                    <div className="p-2 ms-auto">
                        <Button variant="primary" className='btnCadastrar' onClick={() => openModalCreate()}><i className="bi bi-plus"></i> Cadastrar</Button>
                    </div>

                </Stack>

                <div className='areaAnimal'>
                    {filteredAnimals.length === 0 ? (
                        <p>Nenhum animal encontrado.</p>
                    ) : (
                        filteredAnimals.map((animal) => (
                            <AnimalCard animal={animal} key={animal.id} refreshAnimals={refreshAnimals} />
                        ))
                    )}
                </div>

                <div className='d-flex gap-2 p-2 justify-content-center'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${pagination.paginaAtual === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(pagination.paginaAtual - 1)}>
                                    Anterior
                                </button>
                            </li>
                            {renderPagination()}
                            <li
                                className={`page-item ${pagination.paginaAtual >= pagination.totalPaginas - 1 ? 'disabled' : ''
                                    }`}
                            >
                                <button className="page-link" onClick={() => handlePageChange(pagination.paginaAtual + 1)}>
                                    Próximo
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
            <Footer />
        </div >
    )
}

export default Animal