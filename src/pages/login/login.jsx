import { useEffect, useState } from "react";

import Logo from '../../assets/logoFull.svg'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import "./login.scss";

import { useAuthUser } from "../../hooks/login/useAuthUser";

const Login = () => {
    useEffect(() => {
        document.title = 'Login | Anshin Pet';
    }, []);

    const [loginData, setLoginData] = useState({
        email: '',
        senha: '',
    });

    const { authUser, error, loading, success } = useAuthUser();


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        if (success) {

            Toast.fire({
                icon: "success",
                title: "Logado"
            });

            window.location.href = "/dashboard"
        }

        if (error) {
            Toast.fire({
                icon: "error",
                title: "Erro credenciais incorretas"
            });
        }
    }, [success, error])

    const handleLogar = async (e) => {
        e.preventDefault();

        await authUser(loginData);
    }

    return (
        <div className="divLogin">
            <div className="containerLogin">
                <img src={Logo} alt="" width={149} />

                <form onSubmit={handleLogar}>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Digite o e-mail" value={loginData.email || ''}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />

                    <input type="password" className="form-control" id="senha" name="senha" placeholder="Digite a senha" value={loginData.senha || ''}
                        onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })} />

                    <button className="btn btn-primary w-100 py-2" type="submit">Entrar</button>
                </form>
            </div>
        </div >
    )
}

export default Login;