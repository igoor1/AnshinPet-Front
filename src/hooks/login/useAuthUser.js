import { useState } from 'react';
import api, { setAuthToken } from '../../services/api';

export const useAuthUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const authUser = async (newUser) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post('/auth/login', newUser);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setAuthToken();

            setSuccess(true);
        } catch (err) {
            setError('Erro ao Logar');
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    return { authUser, loading, error, success }
}

export default useAuthUser;