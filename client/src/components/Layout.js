import { Outlet } from "react-router-dom"
import Navbar from './Nabar'
import { useLocation } from 'react-router-dom'
import Home from "./Home";
const Layout = () => {
    const location = useLocation();
    return (
        <main className="App">
            <Navbar />
            {location.pathname === '/' ? <Home /> : null}
            <Outlet />
        </main>
    )
}

export default Layout