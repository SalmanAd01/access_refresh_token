import React from 'react'
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const handelGetSession = async (e) => {
        console.log('get session', axiosPrivate);
        try {
            e.preventDefault();
            const controller = new AbortController();
            const response = await axiosPrivate.get('/api/session', {
                signal: controller.signal
            });
            console.log(response.data);
        }
        catch (err) {
            console.log('err', err);
            navigate('/login');
        }
    }
    return (
        <div className="container">
            <h1 className="text-center">
                Welcome to Dashboard
            </h1>
            <button className="btn btn-primary" onClick={handelGetSession}>
                Click Me To Get Session Info
            </button>
            <button className="btn btn-primary" onClick={refresh}>
                Refresh2
            </button>

        </div>
    )
}

export default Dashboard