import { useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import { useFetchAnimalForId } from '../../hooks/animal/useFetchAnimalForId';
import { useFetchMedicals } from "../../hooks/animal/medicals/useFetchMedicals";
import { useDeleteMedical } from "../../hooks/animal/medicals/useDeleteMedical";

import CreateMedicalDoenca from "../../components/animal/medical/CreateMedicalDoenca";
import CreateMedicalVacina from "../../components/animal/medical/CreateMedicalVacina";
import EditMedicalDoenca from "../../components/animal/medical/EditMedicalDoenca";

export function Medicals() {

    const { animalId } = useParams();

    const { animal, loading, error } = useFetchAnimalForId(animalId);
    const { doencas, vacinas, loading: loadingMedicals, error: errorMedicals, refreshMedicals } = useFetchMedicals(animalId);
    const { deleteDoenca, deleteVacina } = useDeleteMedical();
    const [creatingDoencaId, setCreatingDoencaId] = useState(null);
    const [creatingVacinaId, setCreatingVacinaId] = useState(null);

    const [editingDoencaId, setEditingDoencaId] = useState(null);

    const toast = useRef(null);


    if (loading) return <p>Carregando ...</p>;
    if (error) return <p>Erro - {error}</p>;

    if (loadingMedicals) return <p>Carregando ...</p>;
    if (errorMedicals) return <p>Erro - {error}</p>;

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const handleDeleteDoenca = async (doencaId) => {
        const errorMessage = await deleteDoenca(doencaId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Doença do Animal deletado!');
            }, 100);
            refreshMedicals();
        }
    };

    const handleDeleteVacina = async (vacinaId) => {
        const errorMessage = await deleteVacina(vacinaId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Vacina do Animal deletado!');
            }, 100);
            refreshMedicals();
        }
    };

    const handleCreateDoenca = () => {
        setCreatingDoencaId(animalId);
    };

    const handleCloseCreateDoenca = () => {
        setCreatingDoencaId(null);
    };

    const handleCreateVacina = () => {
        setCreatingVacinaId(animalId);
    };

    const handleCloseCreateVacina = () => {
        setCreatingVacinaId(null);
    };

    const handleEditDoenca = (doencaId) => {
        setEditingDoencaId(doencaId);
    };

    const handleCloseEditDoenca = () => {
        setEditingDoencaId(null);
    };



    return (
        <div className="col-10 m-auto">
            <Toast ref={toast} />
            <p>Nome: {animal.nome} </p>
            <Button label="Cadastrar Doenças" severity="info" icon="pi pi-plus" className="m-2" onClick={() => handleCreateDoenca()} />
            <Button label="Cadastrar Vacinas" severity="info" icon="pi pi-plus" className="m-2" onClick={() => handleCreateVacina()} />

            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-content-center">
                <div>
                    <p className="text-center">Doenças</p>
                    {doencas.length === 0 ? (
                        <p>Nenhuma doença encontrada.</p>
                    ) : (
                        doencas.map(doenca => (
                            <div className="m-2 border border-gray-300 p-4" key={doenca.id}>
                                <p>{doenca.doenca.nome} - {doenca.doenca.gravidade} ({doenca.status})</p>
                                <p>{doenca.descricao}</p>
                                <Divider />
                                <div className="flex flex-row flex-wrap">
                                    <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => handleDeleteDoenca(doenca.id)} />
                                    <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" onClick={() => handleEditDoenca(doenca.id)} />
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
                            <div className="m-2 border border-gray-300 p-4" key={vacina.id}>
                                <div>
                                    <p>{vacina.vacina.nome} ({vacina.lote}) - {vacina.vacina.fabricante}</p>
                                    <p>{vacina.dataAplicacao}</p>
                                    <Divider />
                                    <div className="flex flex-row flex-wrap">
                                        <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => handleDeleteVacina(vacina.id)} />
                                        <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>


            </div>

            {
                creatingDoencaId && (
                    <CreateMedicalDoenca
                        animalId={animalId}
                        onClose={handleCloseCreateDoenca}
                        onShowToast={showToast}
                        onRefresh={refreshMedicals}
                    />
                )
            }

            {
                creatingVacinaId && (
                    <CreateMedicalVacina
                        animalId={animalId}
                        onClose={handleCloseCreateVacina}
                        onShowToast={showToast}
                        onRefresh={refreshMedicals}
                    />
                )
            }

            {
                editingDoencaId && (
                    <EditMedicalDoenca
                        doencaId={editingDoencaId}
                        animalId={animalId}
                        onClose={handleCloseEditDoenca}
                        onShowToast={showToast}
                        onRefresh={refreshMedicals}
                    />
                )
            }


        </div>
    )
}