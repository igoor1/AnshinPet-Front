import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import { useRef, useState } from "react";

import { useFetchVacinas } from "../../hooks/vacina/useFetchVacinas";
import { useDeleteVacina } from "../../hooks/vacina/useDeleteVacina";

import CreateVacina from "../../components/vacina/CreateVacina";
import EditVacina from "../../components/vacina/EditVacina";

export function Vacina() {
    const { vacinas, loading, error, refreshVacinas } = useFetchVacinas();
    const { deleteVacina, loading: deleting, error: deleteError } = useDeleteVacina();
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [editingVacinaId, setEditingVacinaId] = useState(null);

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    if (loading) return <p>Carregando ...</p>;
    if (error) return <p>Erro - {error}</p>;

    const handleDelete = async (vacinaId) => {
        const errorMessage = await deleteVacina(vacinaId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Vacina deletada!');
            }, 100);
            refreshVacinas();
        }
    };

    const handleEdit = (vacinaId) => {
        setEditingVacinaId(vacinaId);
    };

    const handleCloseEdit = () => {
        setEditingVacinaId(null);
    };

    return (
        <div className="col-10 m-auto">
            <Toast ref={toast} />
            <Button label="Cadastrar" severity="success" icon="pi pi-plus" className="m-2" onClick={() => setVisibleCreate(true)} />
            <h1>Lista de Vacinas</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
                {vacinas.map(vacina => (
                    <div className="m-2 border border-gray-300 p-4" key={vacina.id}>
                        <div>
                            <p> {vacina.nome} - {vacina.fabricante}</p>
                            <Divider />
                            <div className="flex flex-row flex-wrap">
                                <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => handleDelete(vacina.id)} />
                                <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" onClick={() => handleEdit(vacina.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCreate && (
                <CreateVacina
                    onClose={() => setVisibleCreate(false)}
                    onRefresh={refreshVacinas}
                    onShowToast={showToast}
                />
            )}

            {
                editingVacinaId && (
                    <EditVacina
                        vacinaId={editingVacinaId}
                        onClose={handleCloseEdit}
                        onRefresh={refreshVacinas}
                        onShowToast={showToast}
                    />
                )
            }
        </div>
    );
}
