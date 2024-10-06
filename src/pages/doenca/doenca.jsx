import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { BreadCrumb } from 'primereact/breadcrumb';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { useRef, useState } from "react";

import { useFetchDoencas } from "../../hooks/doenca/useFetchDoencas";
import { useDeleteDoenca } from "../../hooks/doenca/useDeleteDoenca";

import CreateDoenca from "../../components/doenca/CreateDoenca";
import EditDoenca from "../../components/doenca/EditDoenca";


import { Loading } from "../../components/loading/loading";
import { Error } from "../../components/error/error";

import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

export function Doenca() {
    const { doencas, loading, error, refreshDoencas } = useFetchDoencas();
    const { deleteDoenca, loading: deleting, error: deleteError } = useDeleteDoenca();
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [editingDoencaId, setEditingDoencaId] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [doencaToDelete, setDoencaToDelete] = useState(null);

    const [visibleEdit, setVisibleEdit] = useState(false);


    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    if (loading) return <Loading height="100vh" />;
    if (error) return <Error message={error} route="/" />;


    const handleDelete = async () => {
        if (doencaToDelete) {
            const errorMessage = await deleteDoenca(doencaToDelete);

            if (errorMessage) {
                showToast('error', 'Erro', errorMessage);
            } else {
                setTimeout(() => {
                    showToast('success', 'Sucesso', 'Doença deletada!');
                }, 100);
                refreshDoencas();
            }
        }
    };

    const confirmDelete = (doencaId) => {
        setDoencaToDelete(doencaId);
        setConfirmVisible(true);
    };


    const handleEdit = (doencaId) => {
        setEditingDoencaId(doencaId);
        setVisibleEdit(true);
    };

    const items = [{ label: 'Cuiados Médicos' }, { label: 'Doenças' }];
    const home = { icon: 'pi pi-home', url: '/dashboard' }

    return (
        <div>
            <Navbar />
            <BreadCrumb model={items} home={home} />
            <div className="col-10 m-auto">
                <Toast ref={toast} />
                <Button label="Cadastrar" severity="success" icon="pi pi-plus" className="my-3" onClick={() => setVisibleCreate(true)} />
                <h1 className="my-4">Doenças Cadastradas</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
                    {doencas.map(doenca => (
                        <div className="m-2 border border-gray-300 p-4 border-1" key={doenca.id}>
                            <div>
                                <p>Nome: {doenca.nome}</p>
                                <p>Gravidade: {doenca.gravidade}</p>

                                <Divider />
                                <div className="flex flex-row flex-wrap">
                                    <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => confirmDelete(doenca.id)} />
                                    <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" onClick={() => handleEdit(doenca.id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <ConfirmDialog
                    visible={confirmVisible}
                    onHide={() => setConfirmVisible(false)}
                    message="Tem certeza que deseja deletar essa doença?"
                    header="Deletar !"
                    icon="pi pi-exclamation-triangle"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    accept={handleDelete}
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                />

                {visibleCreate && (
                    <CreateDoenca
                        onClose={() => setVisibleCreate(false)}
                        onRefresh={refreshDoencas}
                        onShowToast={showToast}
                        visibleCreate={visibleCreate}
                    />
                )}

                {editingDoencaId && (
                    <EditDoenca
                        doencaId={editingDoencaId}
                        onClose={() => setVisibleEdit(false)}
                        onRefresh={refreshDoencas}
                        onShowToast={showToast}
                        visibleEdit={visibleEdit}
                    />
                )}

            </div>
            <Footer />
        </div>
    );
}