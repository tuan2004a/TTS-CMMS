// pages/Users.jsx
import React from 'react';
import MasterLayout from '../components/layout/MasterLayOut';
import { UserProvider } from '../context/userContext';

export const UsersLayout = ({ children }) => {
    const menuInfo = {
        title: 'Quản lý người dùng',
        icon: 'fa-solid fa-users',
        submenu: [
            { title: 'Tài khoản', path: '/users/account', icon: 'fa-solid fa-user' },
            { title: 'Phân quyền', path: '/users/roles', icon: 'fa-solid fa-user-shield' },
            { title: 'Bộ phận', path: '/users/departments', icon: 'fa-solid fa-building' },
            { title: 'Ca làm', path: '/users/shifts', icon: 'fa-solid fa-clock' }
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

const UserManagement = ({children}) => {
    return (
        <UserProvider>
            <Account>{children}</Account>
        </UserProvider>
    );
};
export default UserManagement;