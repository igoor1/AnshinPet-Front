import { useEffect } from 'react';
import './notFound.scss'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Página não encontrada | Anshin Pet';
    }, []);

    return (
        <div className="divMain">
            <div className="container containerNotFound containerMain">
                <h1>404</h1>
                <p>Página não encontrada !</p>
            </div>
        </div>
    )

}

export default NotFound