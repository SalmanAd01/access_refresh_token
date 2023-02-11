import { axiosInstance } from './../api/axios';
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log('refresh');
        try {

            const response = await axiosInstance.get('/api/refresh', {
                withCredentials: true
            });
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {
                    accessToken: response.data.accessToken
                }
            });
            return response.data.accessToken;
        }
        catch (err) {
            console.log(err);
            setAuth({});
        }
    }
    return refresh;
}

export default useRefreshToken;