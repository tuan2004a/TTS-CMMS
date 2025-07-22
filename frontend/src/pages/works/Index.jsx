// pages/Users.jsx
import MasterLayout from '../../components/layout/MasterLayOut';

const WorksManagement = ({ children }) => {

    const menuInfo = {
        title: 'Quản lý công việc',
        icon: 'fa-solid fa-briefcase',
        submenu: [
            { title: 'Danh sách', path: '/works/work', icon: 'fa-solid fa-ballot-check' },
            { title: 'giao diện', path: '/works/layout', icon: 'fa-solid fa-mobile-notch'}
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

export default WorksManagement;