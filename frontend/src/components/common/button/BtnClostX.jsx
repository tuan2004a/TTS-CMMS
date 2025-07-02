import React from 'react'

const BtnClostX = ({className, onClick}) => {
    return (
        <button onClick={onClick} type='button' className={`${className} rounded-lg bg-transparent cursor-pointer`}>
            <i className="fa-solid fa-xmark"></i>
        </button>
    )
}

export default BtnClostX
