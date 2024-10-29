import { useEffect } from "react";
import NavbarHeader from "../../components/navbar/noAuth/navbarheader";
import Footer from "../../components/footer/footer";
import Loading from "../../components/loading/loading";

import { useFetchAnimals } from "../../hooks/animal/useFetchAnimals";
import { useFetchAdocoes } from "../../hooks/adocao/useFetchAdocoes";

import AnimalAdocaoCard from "../../components/adocao/card/animalAdocaoCard";

import Swal from 'sweetalert2/dist/sweetalert2.js'

const Adocao = () => {
    useEffect(() => {
        document.title = 'Adoção | Anshin Pet';
    }, []);

    const { animals, error, loading } = useFetchAdocoes();

    if (loading) return <Loading />

    if (error) {
        Swal.fire({
            title: 'Erro !',
            text: error,
            icon: 'error',
            confirmButtonText: 'fechar'
        })
    }

    return (
        <div className="divMain">
            <NavbarHeader />

            <div className="containerMain">
                <div className='areaAnimal'>
                    {animals.length === 0 ? (
                        <p>Nenhum animal encontrado.</p>
                    ) : (
                        animals.map((animal) => (
                            <AnimalAdocaoCard animal={animal} key={animal.id} />
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Adocao;