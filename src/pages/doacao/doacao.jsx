import { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";

import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";

import { Fieldset } from 'primereact/fieldset';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Divider } from "primereact/divider";

import CreateDoacao from "../../components/doacao/CreateDoacao";
import EditDoacao from "../../components/doacao/EditDoacao";

import { useFetchDoacoes } from "../../hooks/doacao/useFetchDoacoes";
import { useDeleteDoacao } from "../../hooks/doacao/useDeleteDoacao";
import { useFetchDoacaoForType } from "../../hooks/doacao/useFetchDoacaoForType";

export function Doacao() {
    const { doacoes, loading, error, refreshDoacoes } = useFetchDoacoes();
    const { searchTerm, filteredDoacoes, handleSearch } = useFetchDoacaoForType(doacoes);

    const { deleteDoacao, loading: deleting, error: deleteError } = useDeleteDoacao();

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [doacaoToDelete, setDoacaoToDelete] = useState(null);

    const [confirmVisibleEdit, setConfirmVisibleEdit] = useState(false);
    const [doacaoToEdit, setDoacaoToEdit] = useState(null);

    const [visibleCreateDoacao, setVisibleCreateDoacao] = useState(false);

    const [tipoFiltro, setTipoFiltro] = useState('');

    const [selectedTipo, setSelectedTipo] = useState(null);


    useEffect(() => {
        handleSearch(tipoFiltro);
    }, [tipoFiltro]);


    const items = [
        { name: 'Mostrar tudo', value: '' },
        { name: 'Dinheiro', value: 'D' },
        { name: 'Ração', value: 'R' }
    ]

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const [value, setValue] = useState(null);

    const getTipo = (doacao) => {
        switch (doacao.tipo) {
            case 'D':
                return 'Dinheiro';
            case 'R':
                return 'Ração';
            default:
                return 'Erro';
        }
    };


    const confirmDelete = (doacaoId) => {
        setDoacaoToDelete(doacaoId);
        setConfirmVisible(true);
    };

    const confirmEdit = (doacaoId) => {
        setDoacaoToEdit(doacaoId);
        setConfirmVisibleEdit(true);
    };

    const handleDelete = async () => {
        if (doacaoToDelete) {
            const errorMessage = await deleteDoacao(doacaoToDelete);

            if (errorMessage) {
                showToast('error', 'Erro', errorMessage);
            } else {
                setTimeout(() => {
                    showToast('success', 'Sucesso', 'Doação deletada!');
                }, 100);
                refreshDoacoes();
            }
        }
        setDoacaoToDelete(null);
        setConfirmVisible(false);
    };

    const handleFilterChange = (e) => {
        const selectedValue = e.value;
        setSelectedTipo(selectedValue);
        setTipoFiltro(selectedValue);
    };

    return (
        <>
            <Navbar />
            <div className="col-10 m-auto">
                <Button label="Cadastrar" severity="success" icon="pi pi-plus" className="my-3" onClick={() => setVisibleCreateDoacao(true)} />

                <Toast ref={toast} />


                <div className="card flex justify-content-start mb-2">
                    <SelectButton
                        value={selectedTipo}
                        onChange={handleFilterChange}
                        optionLabel="name"
                        options={items}
                    />
                </div>
                {filteredDoacoes.lenght === 0 ? (<p>Nenhuma Doação encontrada.</p>) : (
                    filteredDoacoes.map(doacao => (
                        <div className="card mb-2" key={doacao.id}>
                            <Fieldset legend={getTipo(doacao)}>
                                <p>
                                    Quantidade: {doacao.quantidade}
                                </p>
                                <p>
                                    Data: {doacao.data}
                                </p>
                                <p>
                                    Descrição: {doacao.descricao}
                                </p>

                                <Divider />

                                <div className="flex flex-row flex-wrap">
                                    <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => confirmDelete(doacao.id)} />
                                    <Button label="Editar" severity="yellow" icon="pi pi-pencil" className="m-2" onClick={() => confirmEdit(doacao.id)} />
                                </div>
                            </Fieldset>
                        </div>
                    )))}


                <ConfirmDialog
                    visible={confirmVisible}
                    onHide={() => setConfirmVisible(false)}
                    message="Tem certeza que deseja deletar essa doação?"
                    header="Deletar !"
                    icon="pi pi-exclamation-triangle"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    accept={handleDelete}
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                />

                {
                    visibleCreateDoacao && (
                        <CreateDoacao
                            onClose={() => setVisibleCreateDoacao(false)}
                            onShowToast={showToast}
                            visibleCreate={visibleCreateDoacao}
                            onRefresh={refreshDoacoes}
                        />
                    )
                }

                {
                    doacaoToEdit && (
                        <EditDoacao
                            doacaoId={doacaoToEdit}
                            onClose={() => setConfirmVisibleEdit(false)}
                            onShowToast={showToast}
                            visibleEdit={confirmVisibleEdit}
                            onRefresh={refreshDoacoes}
                        />
                    )
                }

            </div>
            <Footer />
        </>
    )
}