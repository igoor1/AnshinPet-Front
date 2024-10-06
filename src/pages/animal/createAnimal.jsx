import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateAnimal } from "../../hooks/animal/useCreateAnimal";
import { useUploadImagem } from "../../hooks/animal/image/useUploadImagem";

import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Toast } from "primereact/toast";

import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

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

    const [imagem, setImagem] = useState(null);

    const items = [{ label: 'Animal', url: '/animal' }, { label: 'Cadastrar Animal' }];
    const home = { icon: 'pi pi-home', url: '/dashboard' }

    const toast = useRef(null);
    const navigate = useNavigate();

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const { createAnimal, loading, error, success } = useCreateAnimal();
    const { uploadImagem, loading: loadingImagem } = useUploadImagem();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const animalId = await createAnimal(animalData);

            if (imagem) {
                await uploadImagem(imagem, animalId);
            }

            setAnimalData({
                nome: '',
                tipo: '',
                raca: '',
                cor: '',
                sexo: '',
                porte: '',
                castrado: '',
                adocao: '',
                data: '',
            })

            setImagem(null);


            showToast('success', 'Sucesso', 'Animal cadastrado com sucesso!');

        } catch (err) {
            showToast('error', 'Erro', 'Falha ao cadastrar o animal.');
        }

    };

    return (
        <div>
            <Navbar />
            <BreadCrumb model={items} home={home} />
            <div className="col-10 m-auto">
                <Toast ref={toast} />
                <Button icon="pi pi-arrow-left" label="Voltar" onClick={() => navigate("/animal")} />
                <h1>Cadastrar Novo Animal</h1>
                <form onSubmit={handleSubmit}>
                    <div className="formgrid grid">
                        <div className="field col">
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="nome">Nome</label>
                                    <InputText id="nome" name="nome"
                                        value={animalData.nome || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, nome: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Digite o nome"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="tipo">Tipo</label>
                                    <InputText id="tipo" name="tipo"
                                        value={animalData.tipo || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, tipo: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Digite o tipo"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="raca">Raça</label>
                                    <InputText id="raca" name="raca"
                                        value={animalData.raca || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, raca: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Digite a raça"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="cor">Cor</label>
                                    <InputText id="cor" name="cor"
                                        value={animalData.cor || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, cor: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Digite a cor"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="sexo">Sexo</label>
                                    <InputText id="sexo" name="sexo"
                                        value={animalData.sexo || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, sexo: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Digite o sexo"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="field col">

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="porte">Porte</label>
                                    <InputText id="porte" name="porte"
                                        value={animalData.porte || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, porte: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Digite o porte"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="castrado">Castrado</label>
                                    <InputText id="castrado" name="castrado"
                                        value={animalData.castrado || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, castrado: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="É castrado ?"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">
                                    <label htmlFor="adocao">Adoção</label>
                                    <InputText id="adocao" name="adocao"
                                        value={animalData.adocao || ''}
                                        onChange={(e) => setAnimalData({ ...animalData, adocao: e.target.value })}
                                        required style={{ width: '100%' }}
                                        placeholder="Para adoção ?"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full ">
                                    <label htmlFor="data">Data de Nascimento</label>
                                    <InputText id="data" name="data"
                                        value={animalData.data || ''}
                                        type="date"
                                        onChange={(e) => setAnimalData({ ...animalData, data: e.target.value })}
                                        required style={{ width: '100%' }} placeholder="Digite a data de nascimento" />
                                </div>
                            </div>

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full ">
                                    <label htmlFor="imagem">Imagem do Animal</label>
                                    <InputText id="imagem" name="imagem"
                                        type="file"
                                        onChange={(e) => setImagem(e.target.files[0])}
                                        required style={{ width: '100%' }} placeholder="Insira a imagem do animal" />
                                </div>
                            </div>

                            <div className="flex justify-content-center mt-2">
                                <div className="flex flex-column gap-2 w-full">

                                    <Button type="submit" label={loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem', width: '100%' }} ></i>
                                        : 'Cadastrar'} />

                                </div>
                            </div>

                        </div>

                    </div>
                </form>
            </div >
            <Footer />
        </div >
    );
}
