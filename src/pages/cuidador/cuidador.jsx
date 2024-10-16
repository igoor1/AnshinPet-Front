import { useEffect } from "react";
import { Table, Button, Breadcrumb } from "react-bootstrap";

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbarheader/navbarheader";
import Loading from "../../components/loading/loading";

import { useFetchCuidadores } from "../../hooks/cuidador/useFetchCuidadores";
import { ModalCreate } from "../../components/cuidador/modal/modalCreate";
import { ModalDelete } from "../../components/cuidador/modal/modalDelete";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import "./cuidador.scss"

const Cuidador = () => {
    useEffect(() => {
        document.title = 'Cuidadores | Anshin Pet';
    }, []);

    const { cuidadores, loading, error, refreshCuidadores } = useFetchCuidadores();
    const { openModalCreate } = ModalCreate();
    const { openModalDelete } = ModalDelete(refreshCuidadores);

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
                <Breadcrumb.Item active>Cuidadores</Breadcrumb.Item>
            </Breadcrumb>
            <div className="containerMain">
                <div className="p-2 ms-auto">
                    <Button variant="success" className='btnCadastrar' onClick={() => openModalCreate()}><i className="bi bi-plus"></i> Cadastrar</Button>

                    <Table responsive>
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
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
                                <p>Nenhum cuidador encontrado</p>
                            ) : (
                                cuidadores.map((cuidador) => (
                                    <tr key={cuidador.id} className="text-center trCuidadores">
                                        <td>{cuidador.id}</td>
                                        <td>{cuidador.nome}</td>
                                        <td>{cuidador.cpf}</td>
                                        <td>{cuidador.email}</td>
                                        <td>{cuidador.celular}</td>
                                        <td>{cuidador.sexo}</td>
                                        <td>
                                            <Button variant="danger" className='m-1' onClick={() => openModalDelete(cuidador.id, cuidador.nome)}><i className="bi bi-trash"></i></Button>
                                            <Button variant="success" className='m-1'><i className="bi bi-pencil"></i></Button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Cuidador;