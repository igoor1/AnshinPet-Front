import { useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { BreadCrumb } from 'primereact/breadcrumb';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { useFetchAnimalForId } from '../../hooks/animal/useFetchAnimalForId';
import { useFetchMedicals } from "../../hooks/animal/medicals/useFetchMedicals";
import { useDeleteMedical } from "../../hooks/animal/medicals/useDeleteMedical";

import CreateMedicalDoenca from "../../components/animal/medical/CreateMedicalDoenca";
import CreateMedicalVacina from "../../components/animal/medical/CreateMedicalVacina";
import EditMedicalDoenca from "../../components/animal/medical/EditMedicalDoenca";

import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { Loading } from "../../components/loading/loading";
import { Error } from "../../components/error/error";
import Logo from "../../assets/ImgDefault.png";

export function Medicals() {

    const { animalId } = useParams();

    const { animal, loading, error } = useFetchAnimalForId(animalId);
    const { doencas, vacinas, loading: loadingMedicals, error: errorMedicals, refreshMedicals } = useFetchMedicals(animalId);
    const { deleteDoenca, deleteVacina } = useDeleteMedical();

    const [editDoencaId, setEditDoencaId] = useState(null);
    const [deleteDoencaId, setDeleteDoencaId] = useState(null);

    const [deleteVacinaId, setDeleteVacinaId] = useState(null);

    const [visibleCreateDoenca, setVisibleCreateDoenca] = useState(false);
    const [visibleDeleteDoenca, setVisibleDeleteDoenca] = useState(false);
    const [visibleEditDoenca, setVisibleEditDoenca] = useState(false);

    const [visibleCreateVacina, setVisibleCreateVacina] = useState(false);
    const [visibleDeleteVacina, setVisibleDeleteVacina] = useState(false);



    const toast = useRef(null);
    const navigate = useNavigate();

    const items = [{ label: 'Animal', url: '/animal' }, { label: 'Cuidados Médicos' }];
    const home = { icon: 'pi pi-home', url: '/dashboard' }

    if (loading || loadingMedicals) return <Loading height="100vh" />;
    if (error || errorMedicals) return <Error message={error} route="/animal" />


    const confirmDeleteDoenca = (doencaId) => {
        setDeleteDoencaId(doencaId);
        setVisibleDeleteDoenca(true);
    };


    const confirmDeleteVacina = (vacinaId) => {
        setDeleteVacinaId(vacinaId);
        setVisibleDeleteVacina(true);
    };

    const confirmEditDoenca = (doencaId) => {
        setEditDoencaId(doencaId);
        setVisibleEditDoenca(true);
    }


    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const handleDeleteDoenca = async () => {
        const errorMessage = await deleteDoenca(deleteDoencaId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Doença do Animal deletada!');
            }, 100);
            refreshMedicals();
        }
    };

    const handleDeleteVacina = async () => {
        const errorMessage = await deleteVacina(deleteVacinaId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Vacina do Animal deletada!');
            }, 100);
            refreshMedicals();
        }
    };

    return (
        <div>
            <Navbar />
            <BreadCrumb model={items} home={home} />
            <div className="col-10 m-auto">
                <Toast ref={toast} />
                <Button icon="pi pi-arrow-left" label="Voltar" size="small" onClick={() => navigate("/animal")} />
                <div className="grid grid-cols-12 mt-3">

                    <div> <img src={Logo} alt="" width={120} /></div>

                    <div>
                        <p className="m-2">Nome: {animal.nome} </p>

                        <Button label="Cadastrar Doenças" severity="info" icon="pi pi-plus" className="m-2" size="small" onClick={() => setVisibleCreateDoenca(true)} />
                        <Button label="Cadastrar Vacinas" severity="info" icon="pi pi-plus" className="m-2" size="small" onClick={() => setVisibleCreateVacina(true)} />
                    </div>

                </div>

                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-content-center">
                    <div>
                        <p className="text-center">Doenças</p>
                        {doencas.length === 0 ? (
                            <p>Nenhuma doença encontrada.</p>
                        ) : (
                            doencas.map(doenca => (
                                <div className="m-2 border-1 border-gray-300 border-round-lg p-4" key={doenca.id}>
                                    <p>{doenca.doenca.nome} - {doenca.doenca.gravidade} ({doenca.status})</p>
                                    <p>{doenca.descricao}</p>
                                    <Divider />
                                    <div className="flex flex-row flex-wrap">
                                        <Button label="Deletar" severity="danger" icon="pi pi-trash" size="small" className="m-2" onClick={() => confirmDeleteDoenca(doenca.id)} />
                                        <Button label="Editar" severity="info" icon="pi pi-pencil" size="small" className="m-2" onClick={() => confirmEditDoenca(doenca.id)} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div>
                        <p className="text-center">Vacinas</p>
                        {vacinas.length === 0 ? (
                            <p >Nenhuma vacina encontrada.</p>
                        ) : (
                            vacinas.map(vacina => (
                                <div className="m-2 border-1 border-gray-300 border-round-lg p-4" key={vacina.id}>
                                    <div>
                                        <p>{vacina.vacina.nome} ({vacina.lote}) - {vacina.vacina.fabricante}</p>
                                        <p>{vacina.dataAplicacao}</p>
                                        <Divider />
                                        <div className="flex flex-row flex-wrap">
                                            <Button label="Deletar" severity="danger" icon="pi pi-trash" size="small" className="m-2" onClick={() => confirmDeleteVacina(vacina.id)} />
                                            <Button label="Editar" severity="info" icon="pi pi-pencil" size="small" className="m-2" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>


                <ConfirmDialog
                    visible={visibleDeleteDoenca}
                    onHide={() => setVisibleDeleteDoenca(false)}
                    message="Tem certeza que deseja deletar esta doença?"
                    header="Deletar !"
                    icon="pi pi-exclamation-triangle"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    accept={handleDeleteDoenca}
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                />


                <ConfirmDialog
                    visible={visibleDeleteVacina}
                    onHide={() => setVisibleDeleteVacina(false)}
                    message="Tem certeza que deseja deletar esta vacina?"
                    header="Deletar !"
                    icon="pi pi-exclamation-triangle"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    accept={handleDeleteVacina}
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                />

                {
                    visibleCreateDoenca && (
                        <CreateMedicalDoenca
                            animalId={animalId}
                            onClose={() => setVisibleCreateDoenca(false)}
                            onShowToast={showToast}
                            visibleCreateDoenca={visibleCreateDoenca}
                            onRefresh={refreshMedicals}
                        />
                    )
                }

                {
                    visibleCreateVacina && (
                        <CreateMedicalVacina
                            animalId={animalId}
                            onClose={() => setVisibleCreateVacina(false)}
                            onShowToast={showToast}
                            visibleCreateVacina={visibleCreateVacina}
                            onRefresh={refreshMedicals}
                        />
                    )
                }

                {
                    visibleEditDoenca && (
                        <EditMedicalDoenca
                            doencaId={editDoencaId}
                            animalId={animalId}
                            onClose={() => setVisibleEditDoenca(false)}
                            visibleEditDoenca={visibleEditDoenca}
                            onShowToast={showToast}
                            onRefresh={refreshMedicals}
                        />
                    )
                }


            </div>
            <Footer />
        </div>
    )
}