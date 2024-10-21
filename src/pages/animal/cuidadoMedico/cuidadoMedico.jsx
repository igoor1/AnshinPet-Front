import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Image, Card, Breadcrumb, Accordion, Table, Button, InputGroup } from 'react-bootstrap';

import "./cuidadosMedico.scss"

import Footer from "../../../components/footer/footer"
import NavbarHeader from "../../../components/navbar/auth/navbarheader";

import Swal from 'sweetalert2/dist/sweetalert2.js'

import ImgDefaultAnimal from "../../../assets/imgDefault.png";

import { useFetchAnimalForId } from '../../../hooks/animal/useFetchAnimalForId';
import { useFetchMedicals } from '../../../hooks/animal/medicals/useFetchMedicals';

import { ModalCreateDoenca } from '../../../components/animal/cuidadosMedicos/modal/modalCreateDoenca';
import { ModalDeleteDoenca } from '../../../components/animal/cuidadosMedicos/modal/modalDeleteDoenca';

import { ModalCreateVacina } from '../../../components/animal/cuidadosMedicos/modal/modalCreateVacina';
import { ModalDeleteVacina } from '../../../components/animal/cuidadosMedicos/modalDelete';

import Loading from '../../../components/loading/loading';

const CuidadoMedico = () => {
    useEffect(() => {
        document.title = 'Cuidados Médicos | Anshin Pet';
    }, []);

    const { animalId } = useParams();


    const { animal, error, loading } = useFetchAnimalForId(animalId)
    const { doencas, vacinas, error: errorCuidados, loading: loadingCuidados, refreshMedicals } = useFetchMedicals(animalId);
    const { openModalCreateDoenca } = ModalCreateDoenca(animalId, refreshMedicals)
    const { openModalDeleteDoenca } = ModalDeleteDoenca(refreshMedicals);

    const { openModalCreateVacina } = ModalCreateVacina(animalId, refreshMedicals)
    const { openModalDeleteVacina } = ModalDeleteVacina(refreshMedicals);


    if (loading || loadingCuidados) return <Loading />

    if (error || errorCuidados) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    const getTipo = (animal) => {
        switch (animal.tipo) {
            case 'C':
                return 'Cachorro';
            case 'G':
                return 'Gato';
            case 'A':
                return 'Ave';
            default:
                return 'Erro';
        }
    }


    const getPorte = (animal) => {
        switch (animal.porte) {
            case 'P':
                return 'Pequeno';
            case 'M':
                return 'Médio';
            case 'G':
                return 'Grande';
            default:
                return 'Erro';
        }
    }


    const getSexo = (animal) => {
        switch (animal.sexo) {
            case 'M':
                return 'Maxho';
            case 'F':
                return 'Fêmea';
            default:
                return 'Erro';
        }
    }

    const getStatus = (doenca) => {
        switch (doenca.status) {
            case 'C':
                return 'Curado'
            case 'T':
                return 'Em Tratamento'
            default:
                return 'Erro'
        }
    }

    return (

        <div className="divMain">
            <NavbarHeader />
            <div className="containerMain">
                <Breadcrumb className='mt-3 px-4'>
                    <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/animais">
                        Animais
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Cuidados Médicos - {animal.nome}</Breadcrumb.Item>
                </Breadcrumb>

                <Card className="text-center cardAnimalCuidadsoMedico">
                    <Card.Body>
                        <div className='headerAnimal'>
                            <div>
                                <Image src={ImgDefaultAnimal} alt="Imagem padrão (animal)" className='imagemAnimal' />
                                <p style={{ margin: 'auto' }}> {animal.nome}</p>
                            </div>
                            <div className='infoAnimal'>
                                <p>
                                    Tipo: {getTipo(animal)}
                                </p>
                                <p >
                                    Raça: {animal.raca}
                                </p>
                                <p>
                                    Porte: {getPorte(animal)}
                                </p>

                                <p>
                                    Sexo: {getSexo(animal)}
                                </p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <div className="container containerButtonCuidadosMedicos">
                    <Button variant="success" onClick={() => openModalCreateDoenca()}><i className="bi bi-plus"></i>Cadastrar Doença</Button>

                    <Button variant="success" onClick={() => openModalCreateVacina()}><i className="bi bi-plus"></i>Cadastrar Vacina</Button>
                </div>

                <div className="container mt-3">

                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Doenças</Accordion.Header>
                            <Accordion.Body>
                                <Table responsive>
                                    <thead>
                                        <tr className="text-center">
                                            <th>#</th>
                                            <th >Doença</th>
                                            <th>Status</th>
                                            <th >Descrição</th>
                                            <th>Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doencas.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', margin: '20px' }}>Nenhuma doença encontrada</td>
                                            </tr>
                                        ) : (
                                            doencas.map((doenca) => (
                                                <tr key={doenca.id} className="text-center trCuidadosMedicos">
                                                    <td>{doenca.id}</td>
                                                    <td>{doenca.doenca.nome}</td>
                                                    <td>
                                                        {getStatus(doenca)}
                                                    </td>
                                                    <td>{doenca.descricao}</td>
                                                    <td>
                                                        <Button variant="danger" className='m-1' onClick={() => openModalDeleteDoenca(doenca.doenca.nome, doenca.id)}><i className="bi bi-trash"></i></Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Vacinas</Accordion.Header>
                            <Accordion.Body>
                                <Table responsive>
                                    <thead>
                                        <tr className="text-center">
                                            <th>#</th>
                                            <th >Vacina</th>
                                            <th>Lote</th>
                                            <th>Data de Aplicação</th>
                                            <th>Opções</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vacinas.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', margin: '20px' }}>Nenhuma vacina encontrada</td>
                                            </tr>
                                        ) : (
                                            vacinas.map((vacina) => (
                                                <tr key={vacina.id} className="text-center trCuidadosMedicos">
                                                    <td>{vacina.id}</td>
                                                    <td>{vacina.vacina.nome}</td>
                                                    <td>
                                                        {vacina.lote}
                                                    </td>
                                                    <td>{vacina.dataAplicacao}</td>
                                                    <td>
                                                        <Button variant="danger" className='m-1' onClick={() => openModalDeleteVacina(vacina.vacina.nome, vacina.id)}><i className="bi bi-trash"></i></Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>
            </div>
            <Footer />
        </div >
    )
}

export default CuidadoMedico