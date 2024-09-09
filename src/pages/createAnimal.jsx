import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

import { useState, useRef } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

export default function CreateAnimal() {
    const toast = useRef(null);

    /* Get e Set - Coleta de dados do animal */
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [cor, setCor] = useState('');
    const [raca, setRaca] = useState('');

    const [sexo, setSexo] = useState('');
    const sexoList = [
        'Macho',
        'Fêmea'
    ];

    const [porte, setPorte] = useState(null);
    const porteList = [
        'Pequeno',
        'Medio',
        'Grande'
    ];

    const [castrado, setCastrado] = useState('');
    const castradoList = [
        'Sim',
        'Não'
    ];

    const [adocao, setAdocao] = useState('');
    const adocaoList = [
        'Sim',
        'Não'
    ];


    const [tipo, setTipo] = useState('');
    const tipoList = [
        'Cachorro',
        'Gato',
        'Ave',
    ];
    /*Get e Set - Coleta de dados do animal */

    /* Function Cadastrar */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const animal = { nome, raca, cor, data, sexo, tipo, porte, castrado, adocao }

        try {
            const response = await fetch('http://localhost:8080/animais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(animal),
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Cadastrado', detail: 'Animal Cadastrado com Sucesso!', life: 3000 })

                setNome('');
                setRaca('');
                setCor('');
                setData('');
                setSexo('');
                setTipo('');
                setPorte('');
                setCastrado('');
                setAdocao('');

            } else {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro Animal Cadastrado com Sucesso!', life: 3000 })
                console.log(response.statusText)
            }
        } catch (error) {
            console.error('Erro na requisição:', error);

        }
    }
    /* Function Cadastrar */

    /* BreadCrumb */
    const items = [{ label: 'Animais', url: '/animal' }, { label: 'Castrar Animal' }]
    const home = { icon: 'pi pi-home', url: '/dashboard' }
    /* BreadCrumb */

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Toast ref={toast} />

            <Navbar />

            <BreadCrumb model={items} home={home} className='m-2' />

            <div >
                <form onSubmit={handleSubmit} className='formgrid grid m-4'>

                    <div className='field col-12 md:col-6'>
                        <Dropdown value={tipo} onChange={(e) => setTipo(e.value)} options={tipoList}
                            placeholder="Tipo" className="w-full" required />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <Dropdown value={sexo} onChange={(e) => setSexo(e.value)} options={sexoList}
                            placeholder="Selecione o Sexo" className="w-full" required />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <Dropdown value={porte} onChange={(e) => setPorte(e.value)} options={porteList}
                            placeholder="Selecione o Porte" className="w-full" required />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <Dropdown value={castrado} onChange={(e) => setCastrado(e.value)} options={castradoList}
                            placeholder="Castrado ?" className="w-full" required />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <Dropdown value={adocao} onChange={(e) => setAdocao(e.value)} options={adocaoList}
                            placeholder="Para adoção ?" className="w-full" required />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} required className='w-full' />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Raça' value={raca} onChange={(e) => setRaca(e.target.value)} required className='w-full' />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <InputText type='date' placeholder='Data' value={data} onChange={(e) => setData(e.target.value)} required className='w-full' />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <InputText keyfilter={/^[a-zA-ZçÇéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàÀ\s]*$/} placeholder='Cor' value={cor} onChange={(e) => setCor(e.target.value)} required className='w-full' />
                    </div>

                    <div className='field col-12 md:col-6'>
                        <Button type='submit' label='Cadastrar' severity='help' text raised className='w-full' />
                    </div>

                </form>
            </div>

            <Footer />
        </div>
    )
}