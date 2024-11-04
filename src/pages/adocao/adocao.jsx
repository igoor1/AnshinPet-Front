import { useEffect, useState } from "react";
import NavbarHeader from "../../components/navbar/noAuth/navbarheader";
import Footer from "../../components/footer/footer";
import Loading from "../../components/loading/loading";

import { useFetchAdocoes } from "../../hooks/adocao/useFetchAdocoes";

import AnimalAdocaoCard from "../../components/adocao/card/animalAdocaoCard";

import Swal from 'sweetalert2/dist/sweetalert2.js'

const Adocao = () => {
    useEffect(() => {
        document.title = 'Adoção | Anshin Pet';
    }, []);

    const [page, setPage] = useState(0);

    const { animals, error, loading, pagination } = useFetchAdocoes(page);

    if (loading) return <Loading />

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
        <div className="divMain">
            <NavbarHeader />

            <div className="containerMain">
                <div className='areaAnimalAdocao'>
                    {animals.length === 0 ? (
                        <p>Nenhum animal encontrado.</p>
                    ) : (
                        animals.map((animal) => (
                            <AnimalAdocaoCard animal={animal} key={animal.id} />
                        ))
                    )}
                </div>
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
            <Footer />
        </div>
    )
}

export default Adocao;