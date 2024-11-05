import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};


export default Auth;
