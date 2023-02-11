import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../api/axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setAuth, persist, setPersist } = useAuth();

    const handelSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(email, password);
            axiosInstance.defaults.withCredentials = true;
            const response = await axiosInstance.post('/api/login', {
                email,
                password
            })
            console.log(response.data.accessToken);
            setAuth({ accessToken: response.data.accessToken });
            navigate('/dashboard', { replace: true });
        }
        catch (err) {
            console.log(err);
            alert("Something went wrong");
        }

    }
    const togglePersist = () => {
        setPersist(prev => !prev);
    }
    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])
    return (
        <div className="container">
            <h2 className="text-center">Login Here</h2>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login