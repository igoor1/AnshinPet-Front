import { useEffect } from "react";
import { Table, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";

import Footer from "../../components/footer/footer"
import NavbarHeader from "../../components/navbarheader/navbarheader"
import Loading from "../../components/loading/loading";

import { useFetchVacinas } from "../../hooks/vacina/useFetchVacinas";
import { ModalCreate } from "../../components/vacina/modal/modalCreate";
import { ModalDelete } from "../../components/vacina/modal/modalDelete";
import { ModalEdit } from "../../components/vacina/modal/modalEdit";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import './vacina.scss'


const Vacina = () => {
    useEffect(() => {
        document.title = 'Vacinas | Anshin Pet';
    }, []);

    const { vacinas, loading, error, refreshVacinas } = useFetchVacinas();
    const { openModalCreate } = ModalCreate(refreshVacinas);
    const { openModalDelete } = ModalDelete(refreshVacinas);
    const { openModalEdit } = ModalEdit(refreshVacinas);

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
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Cuidados Médicos</Breadcrumb.Item>
                <Breadcrumb.Item active>Vacinas</Breadcrumb.Item>
            </Breadcrumb>
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
                    <Button variant="success" className="btnCadastrar" onClick={() => openModalCreate()}><i className="bi bi-plus"></i> Cadastrar</Button>
                </div>

            </div>

            <div className="container containerMain mt-4">
                <Table responsive>
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th >Nome</th>
                            <th>Fabricante</th>
                            <th >Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacinas.length === 0 ? (
                            <p>Nenhuma vacina encontrada</p>
                        ) : (
                            vacinas.map((vacina) => (
                                <tr key={vacina.id} className="text-center trVacinas">
                                    <td>{vacina.id}</td>
                                    <td>{vacina.nome}</td>
                                    <td>{vacina.fabricante}</td>
                                    <td>
                                        <Button variant="danger" className='m-1' onClick={() => openModalDelete(vacina.id, vacina.nome)}><i className="bi bi-trash"></i></Button>
                                        <Button variant="success" className='m-1' onClick={() => openModalEdit(vacina)}><i className="bi bi-pencil"></i></Button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <Footer />
        </div>
    )
}

export default Vacina