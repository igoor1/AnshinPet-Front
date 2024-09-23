import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchAnimals } from "../../hooks/animal/useFetchAnimals";
import { useDeleteAnimal } from "../../hooks/animal/useDeleteAnimal";
import { useSearchAnimals } from "../../hooks/animal/useSearchAnimals";

import { Loading } from "../../components/loading/loading";
import { Error } from "../../components/error/error";
import { EditAnimal } from "../../components/animal/EditAnimal";

import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

import Logo from "../../assets/ImgDefault.png";


export function Animal() {
    const { animals, loading, error, refreshAnimals } = useFetchAnimals();
    const { deleteAnimal, loading: deleting, error: deleteError } = useDeleteAnimal();
    const { searchTerm, filteredAnimals, handleSearch } = useSearchAnimals(animals);
    const [editingAnimalId, setEditingAnimalId] = useState(null);

    const toast = useRef(null);
    const navigate = useNavigate();
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [animalToDelete, setAnimalToDelete] = useState(null);
    const [visible, setVisible] = useState(false);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    if (loading) return <Loading height="100vh" />;
    if (error) return <Error message={error} route="/" />;


    const confirmDelete = (animalId) => {
        setAnimalToDelete(animalId);
        setConfirmVisible(true);
    };

    const handleDelete = async () => {
        if (animalToDelete) {
            const errorMessage = await deleteAnimal(animalToDelete);

            if (errorMessage) {
                showToast('error', 'Erro', errorMessage);
            } else {
                setTimeout(() => {
                    showToast('success', 'Sucesso', 'Animal deletado!');
                }, 100);
                refreshAnimals();
            }
        }
        setAnimalToDelete(null);
        setConfirmVisible(false);
    };

    const handleEdit = (animalId) => {
        setEditingAnimalId(animalId);
        setVisible(true);
    };

    const handleCloseEdit = () => {
        setEditingAnimalId(null);
        setVisible(false);
    };

    const getColorTagAdocao = (animal) => {
        switch (animal.adocao) {
            case 'Sim':
                return 'success';
            case 'Não':
                return 'danger';
            default:
                return null;
        }
    };
    const getIconSexo = (animal) => {
        switch (animal.sexo) {
            case 'Macho':
                return 'pi pi-mars';
            case 'Fêmea':
                return 'pi pi-venus';
            default:
                return 'pi pi-times';
        }
    };

    return (
        <div>

            <Navbar />

            <div className="col-10 m-auto">

                <Toast ref={toast} />

                <h1>Animais Cadastrados</h1>
                <div className="flex justify-content-between">
                    <InputText value={searchTerm} onChange={(e) => handleSearch(e.target.value)} placeholder="Busque o animal por nome" />

                    <Button label="Cadastrar" severity="success" onClick={() => navigate("/animal/create")} outlined />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-content-center">
                    {filteredAnimals.length === 0 ? (
                        <p >Nenhum animal encontrado.</p>
                    ) : (
                        filteredAnimals.map(animal => (
                            <div className="m-2 border border-gray-300 p-4" key={animal.id}>
                                <div>
                                    <div className="flex gap-2">
                                        <img src={Logo} alt="" width={150} />
                                        <div>
                                            <p>Nome:{animal.nome}  <i className={getIconSexo(animal)}></i></p>
                                            <p>Tipo: {animal.tipo}</p>
                                            <p>Data de Nascimento: {animal.data}</p>
                                            <Tag value={`Adoção: ${animal.adocao}`} severity={getColorTagAdocao(animal)}></Tag>
                                        </div>
                                    </div>

                                    <Divider />
                                    <div className="flex flex-row flex-wrap">
                                        <Button label="Deletar" severity="danger" icon="pi pi-trash" className="m-2" onClick={() => confirmDelete(animal.id)} />
                                        <Button label="Editar" severity="info" icon="pi pi-pencil" className="m-2" onClick={() => handleEdit(animal.id)} />
                                        <Button label="Médicos" security="help" icon="pi pi-heart" className="m-2" onClick={() => navigate(`/animal/medicals/${animal.id}`)} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <ConfirmDialog
                    visible={confirmVisible}
                    onHide={() => setConfirmVisible(false)}
                    message="Tem certeza que deseja deletar este animal?"
                    header="Deletar !"
                    icon="pi pi-exclamation-triangle"
                    acceptLabel="Sim"
                    rejectLabel="Não"
                    accept={handleDelete}
                    acceptClassName="p-button-success"
                    rejectClassName="p-button-danger"
                />

                {
                    editingAnimalId && (
                        <EditAnimal
                            animalId={editingAnimalId}
                            onClose={handleCloseEdit}
                            onRefresh={refreshAnimals}
                            onShowToast={showToast}
                            visible={visible}
                            setVisible={setVisible}
                        />
                    )
                }
            </div >

            <Footer />
        </div>
    );
}