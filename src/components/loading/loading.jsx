import { Spinner } from "react-bootstrap";
import NavbarHeader from "../navbar/auth/navbarheader";
import Footer from "../footer/footer";
import './loading.scss'

const Loading = () => {
    return (
        <div className="divMain">

            <NavbarHeader />
            <div className="spinerContainer">
                <Spinner animation="border" variant="primary" />
            </div>
            <Footer />
        </div>
    )
}

export default Loading;