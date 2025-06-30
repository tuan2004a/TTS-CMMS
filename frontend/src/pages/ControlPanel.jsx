import React from 'react'
import { Link } from 'react-router'

const ControlPanel = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
            <h1 className='w-full text-center text-2xl font-semibold'>Chào mừng đến hệ thống điều hành sản xuất</h1>
            <div className='grid grid-cols-4 xl:grid-cols-6 gap-5'>
                <Link to={'/users/account'} className='flex flex-col items-center size-full rounded-lg font-semibold text-lg border-2 border-[#ba9f5b] p-5'>
                    <i className="fa-solid fa-user text-4xl mb-5"></i>
                    Quản lý người dùng
                </Link>
                <Link to={'/systemMaintenance/dashboard'} className='flex flex-col items-center size-full rounded-lg font-semibold text-lg border-2 border-[#ba9f5b] p-5'>
                    <i className="fa-solid fa-screwdriver-wrench text-4xl mb-5"></i>
                    Bảo trì
                </Link>
            </div>
        </div>
    )
}

export default ControlPanel
