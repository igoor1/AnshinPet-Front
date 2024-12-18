import { useEffect } from "react";
import { Table, Button, Breadcrumb, Container } from "react-bootstrap";

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbar/auth/navbarheader";
import Loading from "../../components/loading/loading";

import { useFetchCuidadores } from "../../hooks/cuidador/useFetchCuidadores";
import { ModalCreate } from "../../components/cuidador/modal/modalCreate";
import { ModalDelete } from "../../components/cuidador/modal/modalDelete";
import { ModalEdit } from "../../components/cuidador/modal/modalEdit";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import "./cuidador.scss"

const Cuidador = () => {
    useEffect(() => {
        document.title = 'Cuidadores | Anshin Pet';
    }, []);

    const { cuidadores, loading, error, refreshCuidadores } = useFetchCuidadores();
    const { openModalCreate } = ModalCreate(refreshCuidadores);
    const { openModalDelete } = ModalDelete(refreshCuidadores);
    const { openModalEdit } = ModalEdit(refreshCuidadores);

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    const getSexo = (cuidador) => {
        switch (cuidador.sexo) {
            case 'M':
                return 'Masculino';
            case 'F':
                return 'Feminino';
            default:
                return 'Erro'
        }
    }

    return (
        <div className="divMain">
            <NavbarHeader />
            <Breadcrumb className='mt-3 px-4'>
                <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Cuidadores</Breadcrumb.Item>
            </Breadcrumb>
            <div className="containerMain">
                <div className="p-2 ms-auto">
                    <Container>
                        <div className="d-flex justify-content-end mb-4">
                            <Button variant="primary" className='btnCadastrar' onClick={() => openModalCreate()}><i className="bi bi-plus"></i> Cadastrar</Button>
                        </div>

                        <Table responsive className="mt-3 tablePrimary">
                            <thead>
                                <tr className="text-center">
                                    <th >Nome</th>
                                    <th >Cpf</th>
                                    <th >Email</th>
                                    <th >Celular</th>
                                    <th >Sexo</th>
                                    <th >Opções</th>

                                </tr>
                            </thead>
                            <tbody>
                                {cuidadores.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>Nenhum cuidador encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    cuidadores.map((cuidador) => (
                                        <tr key={cuidador.id} className="text-center trCuidadores">
                                            <td>{cuidador.nome}</td>
                                            <td>{cuidador.cpf}</td>
                                            <td>{cuidador.email}</td>
                                            <td>{cuidador.celular}</td>
                                            <td>{getSexo(cuidador)}</td>
                                            <td>
                                                <Button variant="secondary" className='m-1' onClick={() => openModalDelete(cuidador.id, cuidador.nome)}><i className="bi bi-trash"></i></Button>
                                                <Button variant="success" className='m-1' onClick={() => openModalEdit(cuidador)}><i className="bi bi-pencil"></i></Button></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Cuidador;