import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Image, Card, Breadcrumb, Button, Collapse } from 'react-bootstrap';
import { parseISO, format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Footer from "../../../components/footer/footer"
import NavbarHeader from "../../../components/navbar/auth/navbarheader";

import { useFetchAnimalForId } from '../../../hooks/animal/useFetchAnimalForId';
import { useFetchMedicals } from '../../../hooks/animal/medicals/useFetchMedicals';

import { ModalDelete } from '../../../components/animal/modal/modalDelete';
import { ModalEdit } from '../../../components/animal/modal/modalEdit';
import { ModalEditFoto } from '../../../components/animal/modal/modalEditPhoto';

import { ModalCreateDoenca } from '../../../components/animal/cuidadosMedicos/modal/modalCreateDoenca';
import { ModalDeleteDoenca } from '../../../components/animal/cuidadosMedicos/modal/modalDeleteDoenca';

import { ModalCreateVacina } from '../../../components/animal/cuidadosMedicos/modal/modalCreateVacina';
import { ModalDeleteVacina } from '../../../components/animal/cuidadosMedicos/modal/modalDeleteVacina';

import Loading from '../../../components/loading/loading';

import "./detalhes.scss"


const Detalhes = () => {
    useEffect(() => {
        document.title = 'Animal | Detalhes | Anshin Pet';
    }, []);

    const { animalId } = useParams();

    const { animal, error, loading, loadingImg, refreshAnimal } = useFetchAnimalForId(animalId);

    const { openModalDelete } = ModalDelete();
    const { openModalEdit } = ModalEdit(refreshAnimal);
    const { openModalEditFoto } = ModalEditFoto(refreshAnimal);

    const { doencas, vacinas, error: errorCuidados, loading: loadingCuidados, refreshMedicals } = useFetchMedicals(animalId);

    const { openModalCreateDoenca } = ModalCreateDoenca(animalId, refreshMedicals)
    const { openModalDeleteDoenca } = ModalDeleteDoenca(refreshMedicals);

    const { openModalCreateVacina } = ModalCreateVacina(animalId, refreshMedicals)
    const { openModalDeleteVacina } = ModalDeleteVacina(refreshMedicals);

    const [openPanelDoencas, setOpenPanelDoencas] = useState(true);
    const [openPanelVacinas, setOpenPanelVacinas] = useState(true);

    if (loadingImg || loadingCuidados) return <Loading />

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
                return 'Macho';
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
    const getColorAdocao = (animal) => {
        switch (animal.adocao) {
            case 'S':
                return 'badgeYesDetalhes';
            case 'N':
                return 'badgeNoDetalhes';
            default:
                return 'warning'
        }
    }


    const getAdocao = (animal) => {
        switch (animal.adocao) {
            case 'S':
                return 'Adoção';
            case 'N':
                return 'Não Adoção'
            default:
                return 'erro';
        }
    }

    const getColorCastrado = (animal) => {
        switch (animal.castrado) {
            case 'S':
                return 'badgeYesDetalhes';
            case 'N':
                return 'badgeNoDetalhes';
            default:
                return
        }
    }

    const getCastrado = (animal) => {
        switch (animal.castrado) {
            case 'S':
                return 'Castrado';
            case 'N':
                return 'Não Castrado';
            default:
                return 'Erro';
        }
    }


    const calcularIdade = (dataNascimento) => {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();

        const anos = differenceInYears(hoje, nascimento);
        const meses = differenceInMonths(hoje, nascimento) % 12;
        const dias = differenceInDays(hoje, new Date(hoje.getFullYear(), hoje.getMonth(), nascimento.getDate())) % 30;

        return `${anos} anos, ${meses} meses e ${dias} dias`;
    }

    const converterData = (data) => {
        const dataOriginal = data;
        const dataFormatada = format(parseISO(dataOriginal), 'dd/MM/yyyy')
        return dataFormatada;
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
                    <Breadcrumb.Item active>{animal.nome}</Breadcrumb.Item>
                </Breadcrumb>

                <div className='areaDetalhesAnimal'>

                    <div className='animalDetalhes'>
                        <div className='areaAnimalFoto'>
                            <Image src={animal.foto} />
                            <a className='iconeFoto' onClick={() => openModalEditFoto(animal)}>
                                <i
                                    className="bi bi-upload"
                                ></i>
                            </a>
                        </div>
                        <div className='animalDetalhesInfo'>
                            <p className='title'> {animal.nome}</p>
                            <p className='subTitle'>
                                {getTipo(animal)}
                            </p>
                            <div className="badgeContainerDetalhes">
                                <span className={getColorAdocao(animal)}>{getAdocao(animal)}</span>
                                <span className={getColorCastrado(animal)}>{getCastrado(animal)}</span>
                            </div>
                            <p className='item'>
                                Raça: {animal.raca}
                            </p>
                            <p className='item'>
                                Sexo: {getSexo(animal)}
                            </p>
                            <p className='item'>
                                Idade: {calcularIdade(animal.data)}
                            </p>
                            <p className='item'>
                                Cor: {animal.cor}
                            </p>
                            <p className='item'>
                                Porte: {getPorte(animal)}
                            </p>
                        </div>
                    </div>

                    <div className="animalDetalhesAcoes">
                        <div className='titulo'>
                            <h4>Ações</h4>
                        </div>
                        <Button variant="success" onClick={() => openModalEdit(animal)}><i className="bi bi-pencil"></i> Editar</Button>

                        <div className='btnAcoes'>
                            <Button variant="primary" onClick={() => openModalCreateDoenca()}><i className="bi bi-plus"></i> Adicionar Doença</Button>

                            <Button variant="primary" onClick={() => openModalCreateVacina()}><i className="bi bi-plus"></i> Adicionar Vacina</Button>
                        </div>

                        <Button variant="outline-secondary" onClick={() => openModalDelete(animal.id, animal.nome)}><i className="bi bi-trash"></i> Deletar</Button>
                    </div>
                </div>


                <div className="container mt-3">

                    <Card className='areaDoencaVacinas'>
                        <Card.Header onClick={() => setOpenPanelDoencas(!openPanelDoencas)}>
                            <h5>Doenças</h5> <i className={`bi ${openPanelDoencas ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                        </Card.Header>
                        <Collapse in={openPanelDoencas}>
                            <div>
                                <Card.Body>
                                    {doencas.length === 0 ? (
                                        <p>Nenhuma doença encontrada.</p>
                                    ) : (
                                        doencas.map((doenca) => (
                                            <div key={doenca.id} className='cardDoencaVacinas'>
                                                <div>
                                                    <h4>{doenca.doenca.nome}</h4>
                                                    <p className='subTitle'>{getStatus(doenca)}</p>
                                                    <hr />
                                                    <p>{doenca.descricao}</p>
                                                </div>
                                                <div className='areaBtn'>
                                                    <Button variant="outline-primary" onClick={() => openModalDeleteDoenca(doenca.doenca.nome, doenca.id)}><i className="bi bi-trash"></i>  Remover </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className='mt-2 areaDoencaVacinas'>
                        <Card.Header onClick={() => setOpenPanelVacinas(!openPanelVacinas)}>
                            <h5>Vacinas</h5> <i className={`bi ${openPanelVacinas ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                        </Card.Header>
                        <Collapse in={openPanelVacinas}>
                            <div>
                                <Card.Body>
                                    {vacinas.length === 0 ? (
                                        <p>Nenhuma vacina encontrada.</p>
                                    ) : (
                                        vacinas.map((vacina) => (
                                            <div key={vacina.id} className='cardDoencaVacinas'>
                                                <div>
                                                    <h4>{vacina.vacina.nome}</h4>
                                                    <p className='subTitle'>{vacina.lote}</p>
                                                    <p>Data: {converterData(vacina.dataAplicacao)}</p>
                                                </div>
                                                <div className='areaBtn'>
                                                    <Button variant="outline-primary" onClick={() => openModalDeleteVacina(vacina.vacina.nome, vacina.id)}><i className="bi bi-trash"></i>  Remover </Button>
                                                </div>
                                            </div>

                                        ))
                                    )}
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Detalhes