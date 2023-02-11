import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRefreshToken from '../hooks/useRefreshToken';
import useLogout from '../hooks/useLogout'
const Nabar = () => {
    const { auth, setAuth, persist } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();
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

    const LogOut = async () => {
        await logout();
        navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!auth?.accessToken ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>

                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout" onClick={LogOut}>Logout</Link>
                                </li>

                            </>
                        }
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Nabar