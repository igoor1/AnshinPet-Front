import { useEffect } from 'react';

import Footer from "../../components/footer/footer"
import NavbarHeader from "../../components/navbarheader/navbarheader"
import './notFound.scss'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Página não encontrada | Anshin Pet';
    }, []);

    return (
        <div className="divMain">
            <NavbarHeader />
            <div className="container containerNotFound containerMain">
                <h1>404</h1>
                <p>Página não encontrada !</p>
            </div>
            <Footer />
        </div>
    )

}

export default NotFound