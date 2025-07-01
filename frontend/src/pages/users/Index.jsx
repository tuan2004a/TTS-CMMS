// pages/Users.jsx
import React from 'react';
import MasterLayout from '../../components/layout/MasterLayOut';

const UsersManagement = ({ children }) => {
    const menuInfo = {
        title: 'Quản lý người dùng',
        icon: 'fa-solid fa-users',
        submenu: [
            { title: 'Tài khoản',path: '/users/account', icon: 'fa-solid fa-user' },
            { title: 'Phân quyền', path: '/users/role', icon: 'fa-solid fa-user-shield' },
            { title: 'Bộ phận', path: '/users/department', icon: 'fa-solid fa-building' },
            { title: 'Ca làm', path: '/users/shift', icon: 'fa-solid fa-clock' }
        ]
    };
    

    return (
        <MasterLayout menuInfo={menuInfo}>
            <main className="bg-white p-5 rounded-lg w-full">
                {children}
            </main>
        </MasterLayout>
    );
};
export default UsersManagement;