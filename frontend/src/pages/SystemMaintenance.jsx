import React from 'react';
import MasterLayout from '../components/layout/MasterLayOut';


const SystemMaintenance = ({children}) => {

    const menuInfo = {
        title: 'Bảo trì hệ thống',
        // icon: 'fa-solid fa-users',
        submenu: [
            { title: 'Thống kê', path: '/systemMaintenance/dashboard', icon: 'fa-solid fa-chart-pie' },
            { title: 'Lịch bảo trì', path: '/systemMaintenance/maintenancePlanner', icon: 'fa-solid fa-clock' },
            { title: 'Quản lý thiết bị', path: '/systemMaintenance/equipmentManagement', icon: 'fa-solid fa-hard-drive' },
        ]
    };

    return (
        <MasterLayout menuInfo={menuInfo}>
            <main className='bg-white p-5 rounded-lg w-full'>
                {children}
            </main>
        </MasterLayout>
    )
}

export default SystemMaintenance
