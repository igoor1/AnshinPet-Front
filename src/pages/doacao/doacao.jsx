import { useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import Footer from "../../components/footer/footer"
import NavbarHeader from "../../components/navbarheader/navbarheader"

import Swal from 'sweetalert2/dist/sweetalert2.js'

import DoacaoCard from "../../components/doacao/card/doacaoCard";

import { useFetchDoacoes } from "../../hooks/doacao/useFetchDoacoes";

import './doacao.scss';
import Loading from "../../components/loading/loading";

const Doacao = () => {
    useEffect(() => {
        document.title = 'Doações | Anshin Pet';
    }, []);

    const { doacoes, error, loading, refreshDoacoes } = useFetchDoacoes();

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
            <div className="container containerMain">
                <div className="container d-flex">
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
                        <Button variant="success" onClick={() => openModalCreate()}><i className="bi bi-plus"></i> Cadastrar</Button>
                    </div>

                </div>
                <div className="container containerMain mt-4">


                    <div className='areaDoacao'>
                        {doacoes.length === 0 ? (
                            <p>Nenhuma doação encontrada.</p>
                        ) : (
                            doacoes.map((doacao) => (
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