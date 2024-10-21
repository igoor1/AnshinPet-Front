import { useEffect } from "react";
import { Table, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbar/auth/navbarheader";
import Loading from "../../components/loading/loading";

import { useFetchDoencas } from "../../hooks/doenca/useFetchDoencas";
import { ModalCreate } from "../../components/doenca/modal/modalCreate";
import { ModalDelete } from "../../components/doenca/modal/modalDelete";
import { ModalEdit } from "../../components/doenca/modal/modalEdit";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import "./doenca.scss"

const Doenca = () => {
    useEffect(() => {
        document.title = 'Doenças | Anshin Pet';
    }, []);

    const { doencas, loading, error, refreshDoencas } = useFetchDoencas();
    const { openModalCreate } = ModalCreate(refreshDoencas);
    const { openModalDelete } = ModalDelete(refreshDoencas);
    const { openModalEdit } = ModalEdit(refreshDoencas);

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    const getGravidade = (doenca) => {
        switch (doenca.gravidade) {
            case 'B':
                return 'Baixa';
            case 'M':
                return 'Média';
            case 'A':
                return 'Alta';
            default:
                return 'Erro'
        }
    }

    return (
        <div className="divMain">
            <NavbarHeader />
            <Breadcrumb className='mt-3 px-4'>
                <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Cuidados Médicos</Breadcrumb.Item>
                <Breadcrumb.Item active>Doenças</Breadcrumb.Item>
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
                            <th>Gravidade</th>
                            <th >Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doencas.length === 0 ? (
                            <p>Nenhuma doença encontrada</p>
                        ) : (
                            doencas.map((doenca) => (
                                <tr key={doenca.id} className="text-center trDoencas">
                                    <td>{doenca.id}</td>
                                    <td>{doenca.nome}</td>
                                    <td>
                                        {getGravidade(doenca)}
                                    </td>
                                    <td>
                                        <Button variant="danger" className='m-1' onClick={() => openModalDelete(doenca.id, doenca.nome)}><i className="bi bi-trash"></i></Button>
                                        <Button variant="success" className='m-1' onClick={() => openModalEdit(doenca)}><i className="bi bi-pencil"></i></Button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            <Footer />
        </div >
    )
}

export default Doenca;