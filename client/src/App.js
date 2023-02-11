import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import CheckAuth from './components/CheckAuth';
function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>

        <Route element={<CheckAuth />}>
          <Route path="/signup" element={<Signup></Signup>} />
        </Route>

        <Route element={<CheckAuth />}>
          <Route path="/login" element={<Login></Login>} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard></Dashboard >} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
