import { useNavigate } from 'react-router-dom';
import api from '../../services/api';


export const useLogoutUser = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];

        navigate('/login');
    };

    return { logout }
}

export default useLogoutUser;
