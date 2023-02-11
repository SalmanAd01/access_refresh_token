import { useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from "react-router-dom"

const CheckAuth = () => {
    const { auth, setAuth, persist } = useAuth();
    const refresh = useRefreshToken();
    useEffect(() => {
        console.log('Check AUth ', auth);
        const checkAuth = async () => {
            console.log('Refresh Token');
            await refresh();
            console.log('Refresh Token2');
        }
        try {
            if (persist) {
                checkAuth();
            }
        }
        catch (err) {
            console.log(err);
            setAuth({});
        }
        // checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const location = useLocation();


    return (
        !auth?.accessToken ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    )

}

export default CheckAuth;