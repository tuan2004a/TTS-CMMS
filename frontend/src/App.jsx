import { BrowserRouter as Router, Routes, Route } from 'react-router'
import ControlPanel from './pages/ControlPanel';
import Users from './pages/Users';
import Role from './components/users/Role';
import Account from './components/users/Account';
import Department from './components/users/Departments';
import Shifts from './components/users/Shifts';
import Dashboard from './components/systemMaintenance/Dashboard';
import MaintenancePlanner from './components/systemMaintenance/MaintenancePlanner'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<ControlPanel />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/roles" element={<Role />} />
                    <Route path="/users/account" element={<Account />} />
                    <Route path="/users/shifts" element={<Shifts />} />
                    <Route path="/users/departments" element={<Department />} />
                    <Route path="/systemMaintenance/dashboard" element={<Dashboard />} />
                    <Route path="/systemMaintenance/maintenancePlanner" element={<MaintenancePlanner />} />
                </Routes>
            </Router>
        </>
    )
}

export default App