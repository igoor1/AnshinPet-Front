import { useEffect } from "react";
import { Breadcrumb, Button } from "react-bootstrap";

import Footer from "../../components/footer/footer";
import NavbarHeader from "../../components/navbarheader/navbarheader";
import "./cuidador.scss"

import { ModalCreate } from "../../components/cuidador/modal/modalCreate";

const Cuidador = () => {
    useEffect(() => {
        document.title = 'Cuidadores | Anshin Pet';
    }, []);

    const { openModalCreate } = ModalCreate();

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
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Cuidador;