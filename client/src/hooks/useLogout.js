import { axiosInstance } from "../api/axios";
import useAuth from "./useAuth";


const useLogout = () => {
    const { auth, setAuth } = useAuth();
    const logout = async () => {

        try {
            const response = await axiosInstance.post('/api/logout', {}, {
                headers: {
                    'authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
                credentials: 'same-origin'
            })
            console.log(response.data);
            setAuth({});
        }
        catch (err) {
            console.log(err);
        }
    }
    return logout;

}

export default useLogout;