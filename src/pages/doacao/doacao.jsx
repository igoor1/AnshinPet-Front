import { useEffect, useState } from "react";
import { Button, Breadcrumb, Nav } from "react-bootstrap";
import Footer from "../../components/footer/footer"
import NavbarHeader from "../../components/navbar/auth/navbarheader";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import DoacaoCard from "../../components/doacao/card/doacaoCard";

import { useFetchDoacoes } from "../../hooks/doacao/useFetchDoacoes";
import { useFetchDoacaoForType } from "../../hooks/doacao/useFetchDoacaoForType";
import { ModalCreateDinheiro } from "../../components/doacao/modal/modalCreateDinheiro";
import { ModalCreateRacao } from "../../components/doacao/modal/modalCreateRacao";

import './doacao.scss';
import Loading from "../../components/loading/loading";

const Doacao = () => {
    useEffect(() => {
        document.title = 'Doações | Anshin Pet';
    }, []);

    const { doacoes, error, loading, refreshDoacoes } = useFetchDoacoes();
    const { filteredDoacoes, handleSearch, searchTerm } = useFetchDoacaoForType(doacoes);
    const { openModalCreateDinheiro } = ModalCreateDinheiro(refreshDoacoes);
    const { openModalCreateRacao } = ModalCreateRacao(refreshDoacoes);
    const [tipoFiltro, setTipoFiltro] = useState(null);

    const handleFilterChange = (e) => {
        const value = e.value;
        setTipoFiltro(value);
    }

    useEffect(() => {
        handleSearch(tipoFiltro)
    }, [tipoFiltro])

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
        <div className="divMain">
            <NavbarHeader />
            <Breadcrumb className='mt-3 px-4'>
                <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Doações</Breadcrumb.Item>
            </Breadcrumb>

            <div className="container areaFiltrosBtn">
                <div className="containerFiltros">
                    <h3>Filtrar por:</h3>
                    <Nav variant="pills" defaultActiveKey="tipo-1">
                        <Nav.Item>
                            <Nav.Link eventKey="tipo-1" onClick={() => handleFilterChange({ value: "" })}>Todos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tipo-2" onClick={() => handleFilterChange({ value: "D" })}>Dinheiro</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tipo-3" onClick={() => handleFilterChange({ value: "R" })}>
                                Ração
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="containerBtn">
                    <div className="title">
                        <h3>Cadastros</h3>
                    </div>
                    <div className="btns">
                        <Button variant="primary" onClick={() => openModalCreateDinheiro()}><i className="bi bi-piggy-bank"></i> Dinheiro</Button>

                        <Button variant="primary" onClick={() => openModalCreateRacao()}><i className="bi bi-box2-heart"></i> Ração</Button>
                    </div>
                </div>

            </div>

            <div className="container containerMain">

                <div className="container containerMain mt-4">

                    <div className='areaDoacao'>
                        {filteredDoacoes.length === 0 ? (
                            <p>Nenhuma doação encontrada.</p>
                        ) : (
                            filteredDoacoes.map((doacao) => (
                                <DoacaoCard doacao={doacao} key={doacao.id} refreshDoacoes={refreshDoacoes} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Doacao