// import React, { useState } from 'react';
import { NavLink } from 'react-router'; // 🛠️ đúng là 'react-router-dom' chứ không phải 'react-router'

const SideBar = ({ menuInfo, isOpenSidebar }) => {
    const sidebarWidth = isOpenSidebar ? 256 : 64
    // const [activeMenu, setActiveMenu] = useState(null);

    // const toggleMenu = (index) => {
    //     setActiveMenu(activeMenu === index ? null : index);
    // };

    return (
        <nav className='size-full px-3 overflow-y-auto'>
            <div className='w-full h-[64px] pl-5 mb-7 flex items-center'>
                <h1 className='text-white text-xl font-bold'>Logo</h1>
            </div>

            <ul>
                {/* Tên menu chính */}
                <li>
                    <NavLink to={'/'} className='!flex !items-center px-5 py-2.5 rounded-lg !text-zinc-400 hover:!bg-zinc-800'>
                        <i className="fa-solid fa-home text-base w-5"></i>
                        <span className='ml-3 text-base font-medium'>Trang chủ</span>
                    </NavLink>
                </li>

                {/* Các submenu */}
                {menuInfo.submenu?.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `!flex !items-center px-5 py-2.5 rounded-lg font-medium ${
                                    isActive ? '!bg-[#007bff] !text-white' : '!text-zinc-400 hover:!bg-zinc-800'
                                }`
                            }
                        >
                            <i className={`${item.icon} w-5 text-base`}></i>
                            <span className='ml-3 text-base'>{item.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SideBar;
