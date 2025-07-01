import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ControlPanel from './pages/ControlPanel';
import Users from './pages/users/Index';
import Role from './pages/users/Role';
import Account from './pages/users/Account';
import Department from './pages/users/Departments';
import Shifts from './pages/users/Shifts';
import Dashboard from './components/systemMaintenance/Dashboard';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<ControlPanel />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/roles" element={<Role />} />
                    <Route path="/users/Account" element={<Account />} />
                    <Route path="/users/shifts" element={<Shifts />} />
                    <Route path="/users/departments" element={<Department />} />
                    <Route path="/systemMaintenance/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </>
    )
}

export default App