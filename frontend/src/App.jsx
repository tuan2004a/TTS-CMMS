import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ControlPanel from './pages/ControlPanel';
import Users from './pages/users/Index';
import Role from './pages/users/Role';
import Account from './pages/users/Account';
import Department from './pages/users/Departments';
import Shifts from './pages/users/Shifts';
import Dashboard from './components/systemMaintenance/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<ControlPanel />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/account" element={<Account />} />
                <Route path="/users/role" element={<Role />} />
                <Route path="/users/department" element={<Department />} />
                <Route path="/users/shift" element={<Shifts />} />
                {/* <Route path="/systemMaintenance/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
        </>
    )
}

export default App