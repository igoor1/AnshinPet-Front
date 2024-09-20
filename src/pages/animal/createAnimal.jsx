import { useState } from "react";
import { useCreateAnimal } from "../../hooks/animal/useCreateAnimal";

export function CreateAnimal() {
    const [animalData, setAnimalData] = useState({
        nome: '',
        tipo: '',
        raca: '',
        cor: '',
        sexo: '',
        porte: '',
        castrado: '',
        adocao: '',
        data: null,
    });
    const { createAnimal, loading, error, success } = useCreateAnimal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createAnimal(animalData)
    };

    return (
        <div>
            <a href="/animal">Voltar</a>
            <h1>Criar Novo Animal</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={animalData.nome || ''}
                    onChange={(e) => setAnimalData({ ...animalData, nome: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tipo"
                    value={animalData.tipo || ''}
                    onChange={(e) => setAnimalData({ ...animalData, tipo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Raça"
                    value={animalData.raca || ''}
                    onChange={(e) => setAnimalData({ ...animalData, raca: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Cor"
                    value={animalData.cor || ''}
                    onChange={(e) => setAnimalData({ ...animalData, cor: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Sexo"
                    value={animalData.sexo || ''}
                    onChange={(e) => setAnimalData({ ...animalData, sexo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Porte"
                    value={animalData.porte || ''}
                    onChange={(e) => setAnimalData({ ...animalData, porte: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Castrado"
                    value={animalData.castrado || ''}
                    onChange={(e) => setAnimalData({ ...animalData, castrado: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Adoção"
                    value={animalData.adocao || ''}
                    onChange={(e) => setAnimalData({ ...animalData, adocao: e.target.value })}
                />

                <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={animalData.data || ''}
                    onChange={(e) => setAnimalData({ ...animalData, data: e.target.value })}
                />

                <button type="submit"> {loading ? 'Cadastrando...' : 'Cadastrar'}</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>Animal cadastrado com sucesso!</p>}
        </div>
    );
}
