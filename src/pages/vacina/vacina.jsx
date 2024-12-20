import { useEffect } from "react";
import { Table, Button, Form, InputGroup, Breadcrumb } from "react-bootstrap";

import Footer from "../../components/footer/footer"
import NavbarHeader from "../../components/navbar/auth/navbarheader";
import Loading from "../../components/loading/loading";

import { useFetchVacinas } from "../../hooks/vacina/useFetchVacinas";
import { useSearchVacinas } from "../../hooks/vacina/useSearchVacinas";
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
    const { searchTerm, filteredVacinas, handleSearch } = useSearchVacinas(vacinas);
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
                <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
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
                            <th>Fabricante</th>
                            <th >Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVacinas.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center">Nenhuma vacina encontrada</td>
                            </tr>
                        ) : (
                            filteredVacinas.map((vacina) => (
                                <tr key={vacina.id} className="text-center trVacinas">
                                    <td>{vacina.nome}</td>
                                    <td>{vacina.fabricante}</td>
                                    <td>
                                        <Button variant="secondary" className='m-1' onClick={() => openModalDelete(vacina.id, vacina.nome)}><i className="bi bi-trash"></i></Button>
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