import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { BreadCrumb } from 'primereact/breadcrumb';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { useRef, useState } from "react";

import { useFetchVacinas } from "../../hooks/vacina/useFetchVacinas";
import { useDeleteVacina } from "../../hooks/vacina/useDeleteVacina";

import CreateVacina from "../../components/vacina/CreateVacina";
import EditVacina from "../../components/vacina/EditVacina";

import { Loading } from "../../components/loading/loading";
import { Error } from "../../components/error/error";

import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

export function Vacina() {
    const { vacinas, loading, error, refreshVacinas } = useFetchVacinas();
    const { deleteVacina, loading: deleting, error: deleteError } = useDeleteVacina();
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [editingVacinaId, setEditingVacinaId] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [vacinaToDelete, setVacinaToDelete] = useState(null);


    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    if (loading) return <Loading height="100vh" />;
    if (error) return <Error message={error} />;

    const handleDelete = async (vacinaId) => {
        if (vacinaToDelete) {
            const errorMessage = await deleteVacina(vacinaToDelete);

            if (errorMessage) {
                showToast('error', 'Erro', errorMessage);
            } else {
                setTimeout(() => {
                    showToast('success', 'Sucesso', 'Vacina deletada!');
                }, 100);
                refreshVacinas();
            }
        }
    };

    const confirmDelete = (vacinaId) => {
        setVacinaToDelete(vacinaId);
        setConfirmVisible(true);
    };

    const handleEdit = (vacinaId) => {
        setEditingVacinaId(vacinaId);
        setVisibleEdit(true);
    };

    const items = [{ label: 'Cuiados Médicos' }, { label: 'Vacinas' }];
    const home = { icon: 'pi pi-home', url: '/dashboard' }

    return (
        <div>
            <Navbar />
            <BreadCrumb model={items} home={home} />
            <div className="col-10 m-auto">
                <Toast ref={toast} />
                <Button label="Cadastrar" severity="success" icon="pi pi-plus" className="my-3" onClick={() => setVisibleCreate(true)} />
                <h1 className="my-4">Lista de Vacinas</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
                    {vacinas.map(vacina => (
                        <div className="m-2 border border-gray-300 p-4 border-1" key={vacina.id}>
                            <div>
                                <p>Nome: {vacina.nome}</p>
                                <p>Fabricante: {vacina.fabricante}</p>
                                <Divider />
                                <div className="flex flex-row flex-wrap">
                                    <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => confirmDelete(vacina.id)} />
                                    <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" onClick={() => handleEdit(vacina.id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <ConfirmDialog
                    visible={confirmVisible}
                    onHide={() => setConfirmVisible(false)}
                    message="Tem certeza que deseja deletar essa vacina?"
                    header="Deletar !"
                    icon="pi pi-exclamation-triangle"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    accept={handleDelete}
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                />

                {visibleCreate && (
                    <CreateVacina
                        onClose={() => setVisibleCreate(false)}
                        onRefresh={refreshVacinas}
                        onShowToast={showToast}
                        visibleCreate={visibleCreate}
                    />
                )}

                {
                    editingVacinaId && (
                        <EditVacina
                            vacinaId={editingVacinaId}
                            onClose={() => setVisibleEdit(false)}
                            onRefresh={refreshVacinas}
                            onShowToast={showToast}
                            visibleEdit={visibleEdit}
                        />
                    )
                }
            </div>
            <Footer />
        </div>
    );
}
