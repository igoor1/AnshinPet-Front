import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import { useRef, useState } from "react";

import { useFetchDoencas } from "../../hooks/doenca/useFetchDoencas";
import { useDeleteDoenca } from "../../hooks/doenca/useDeleteDoenca";

import CreateDoenca from "../../components/doenca/CreateDoenca";
import EditDoenca from "../../components/doenca/EditDoenca";

export function Doenca() {
    const { doencas, loading, error, refreshDoencas } = useFetchDoencas();
    const { deleteDoenca, loading: deleting, error: deleteError } = useDeleteDoenca();
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [editingDoencaId, setEditingDoencaId] = useState(null);


    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    if (loading) return <p>Carregando ...</p>;
    if (error) return <p>Erro - {error}</p>;

    const handleDelete = async (doencaId) => {
        const errorMessage = await deleteDoenca(doencaId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Doença deletada!');
            }, 100);
            refreshDoencas();
        }
    };

    const handleEdit = (doencaId) => {
        setEditingDoencaId(doencaId);
    };

    const handleCloseEdit = () => {
        setEditingDoencaId(null);
    };

    return (
        <div className="col-10 m-auto">
            <Toast ref={toast} />
            <Button label="Cadastrar" severity="success" icon="pi pi-plus" className="m-2" onClick={() => setVisibleCreate(true)} />
            <h1>Lista de Doenças</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
                {doencas.map(doenca => (
                    <div className="m-2 border border-gray-300 p-4" key={doenca.id}>
                        <div>
                            <p> {doenca.nome} - {doenca.gravidade}</p>
                            <Divider />
                            <div className="flex flex-row flex-wrap">
                                <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => handleDelete(doenca.id)} />
                                <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" onClick={() => handleEdit(doenca.id)} />
                                <Button label="Médicos" security="help" icon="pi pi-heart" className="m-2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCreate && (
                <CreateDoenca
                    onClose={() => setVisibleCreate(false)}
                    onRefresh={refreshDoencas}
                    onShowToast={showToast}
                />
            )}

            {
                editingDoencaId && (
                    <EditDoenca
                        doencaId={editingDoencaId}
                        onClose={handleCloseEdit}
                        onRefresh={refreshDoencas}
                        onShowToast={showToast}
                    />
                )
            }
        </div>
    );
}
