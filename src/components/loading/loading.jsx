import { Spinner } from "react-bootstrap";

import './loading.scss'

const Loading = () => {
    return (
        <div className="divMain">
            <div className="spinerContainer">
                <Spinner animation="border" variant="primary" />
            </div>
        </div>
    )
}

export default Loading;