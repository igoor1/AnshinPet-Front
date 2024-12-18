import { useEffect } from "react";
import { Table, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbar/auth/navbarheader";
import Loading from "../../components/loading/loading";

import { useFetchDoencas } from "../../hooks/doenca/useFetchDoencas";
import { useSearchDoencas } from "../../hooks/doenca/useSearchDoencas";
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
    const { searchTerm, filteredDoencas, handleSearch } = useSearchDoencas(doencas);
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
                        <Form.Control id="inlineFormInputGroup" placeholder="Busque pelo nome" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="p-2 ms-auto align-content-center">
                    <Button variant="primary" className="btnCadastrar" onClick={() => openModalCreate()}><i className="bi bi-plus"></i> Cadastrar</Button>
                </div>

            </div>
            <div className="container containerMain mt-4">
                <Table responsive className="tablePrimary">
                    <thead>
                        <tr className="text-center">
                            <th >Nome</th>
                            <th>Gravidade</th>
                            <th >Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoencas.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center">Nenhuma doença encontrada</td>
                            </tr>
                        ) : (
                            filteredDoencas.map((doenca) => (
                                <tr key={doenca.id} className="text-center trDoencas">
                                    <td>{doenca.nome}</td>
                                    <td>
                                        {getGravidade(doenca)}
                                    </td>
                                    <td>
                                        <Button variant="secondary" className='m-1' onClick={() => openModalDelete(doenca.id, doenca.nome)}><i className="bi bi-trash"></i></Button>
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