import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { FloatLabel } from 'primereact/floatlabel';


import Logo from '../../assets/logoFull.svg'

export function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>

            <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
                <img src={Logo} width={200} className="mb-4" />

                <FloatLabel className="mb-4" style={{ width: "100%" }}>
                    <InputText id="username" value={nome} onChange={(e) => setNome(e.target.nome)} style={{ width: "100%" }} />
                    <label htmlFor="username">Username</label>
                </FloatLabel>

                <FloatLabel className="mb-4" style={{ width: "100%" }}>
                    <Password id="password" value={senha} onChange={(e) => setSenha(e.target.senha)} feedback={false} style={{ width: "100%" }} toggleMask />
                    <label htmlFor="password">Password</label>
                </FloatLabel>


                <Button label="Login" style={{ width: "100%" }} onClick={() => navigate("/dashboard")} />
            </div>
        </div>
    );
}

