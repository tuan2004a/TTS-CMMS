import React from 'react'

const NavBar = () => {
    return (
        <header className='flex items-center justify-end w-full space-x-3'>
            <button type="button" title='DarkMode' className='cursor-pointer size-10 text-[#99a1b7] hover:text-blue-500 hover:bg-[#F0F8FF] rounded-lg flex items-center justify-center'>
                <i className="fa-solid fa-moon text-xl"></i>
            </button>
            <button type="button" title='Notification' className='cursor-pointer size-10 text-[#99a1b7] hover:text-blue-500 hover:bg-[#F0F8FF] rounded-lg flex items-center justify-center'>
                <i className="fa-solid fa-bell text-xl"></i>
            </button>
            <div className='size-10 rounded-lg'>
                <img className='size-full rounded-lg' src="https://i.pravatar.cc/" alt="" />
            </div>
        </header>
    )
}

export default NavBar
