import { Toast } from "primereact/toast";

import { useRef, useState } from "react";

import { useFetchAnimals } from "../../hooks/animal/useFetchAnimals";
import { useDeleteAnimal } from "../../hooks/animal/useDeleteAnimal";
import { useSearchAnimals } from "../../hooks/animal/useSearchAnimals";

import EditAnimal from "../../components/animal/EditAnimal";

export function Animal() {
    const { animals, loading, error, refreshAnimals } = useFetchAnimals();
    const { deleteAnimal, loading: deleting, error: deleteError } = useDeleteAnimal();
    const { searchTerm, filteredAnimals, handleSearch } = useSearchAnimals(animals);
    const [editingAnimalId, setEditingAnimalId] = useState(null);

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    if (loading) return <p>Carregando ...</p>;
    if (error) return <p>Erro - {error}</p>;

    const handleDelete = async (animalId) => {
        const errorMessage = await deleteAnimal(animalId);

        if (errorMessage) {
            showToast('error', 'Erro', errorMessage);
        } else {
            setTimeout(() => {
                showToast('success', 'Sucesso', 'Animal deletado!');
            }, 100);
            refreshAnimals();
        }
    };

    const handleEdit = (animalId) => {
        setEditingAnimalId(animalId);
    };

    const handleCloseEdit = () => {
        setEditingAnimalId(null);
    };

    return (
        <div>
            <Toast ref={toast} />
            <a href="/animal/create">Cadastrar</a>
            <h1>Lista de Animais</h1>
            <input
                type="text"
                placeholder="Buscar animal por nome"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <ul>
                {filteredAnimals.length === 0 ? (
                    <li>Nenhum animal encontrado.</li>
                ) : (
                    filteredAnimals.map(animal => (
                        <li key={animal.id}>
                            {animal.nome} - {animal.tipo} - {animal.data} anos
                            <button
                                onClick={() => handleDelete(animal.id)}
                                disabled={deleting}
                            >
                                Deletar
                            </button>
                            <button onClick={() => handleEdit(animal.id)}>Editar</button>
                        </li>
                    ))
                )}
            </ul>
            {editingAnimalId && (
                <EditAnimal
                    animalId={editingAnimalId}
                    onClose={handleCloseEdit}
                    onRefresh={refreshAnimals}
                    onShowToast={showToast}
                />
            )}
        </div>
    );
}
