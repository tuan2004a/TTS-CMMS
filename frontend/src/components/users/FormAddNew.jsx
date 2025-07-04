//compponent/users/FormAddNew.jsx
import React, { useState } from 'react'
import BtnClostX from '../common/button/BtnClostX';
import BtnSubmit from '../common/button/BtnSubmit';
import { useShiftContext } from '../../context/shiftContext';
import { showSuccess, showError } from '../../utils/toast'; 

const FormAddNew = ({handleCloseFormAddNew, isOpenFormAddNew}) => {

    const {createShift} = useShiftContext();
    const [formData, setFormData] = useState({
        shift: '',
        time:'',
        description: '',
        status: true,
    })
    const [error , setError] = useState({
        name:"",
        message:""
    })

    const handlInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleCloseForm = ()=>{
        setFormData({
            shift: '',
            time:'',
            description: '',
            status: true,
        })
        setError({
            name:"",
            message:""
        })
        handleCloseFormAddNew();
    }

    const handleSubmit = (e) =>{
        if(formData.shift === ''){
            setError({
                name: "shift",
                message: "Vui lòng nhập tên ca làm việc"
            })
            return;
        }else if(formData.time === ''){
            setError({
                name: "time",
                message: "Vui lòng nhập thời gian"
            })
            return;
        }
        e.preventDefault();
        try {
            createShift(formData);
            handleCloseFormAddNew();
            showSuccess('Thêm ca làm việc thành công');
            setFormData({
                shift: '',
                time:'',
                description: '',
                status: true,
            })
        } catch (error) {
            console.log(error);
            showError('Thêm ca làm việc thất bại');
            throw error;
        }
    }

    return (
        <div className={`${isOpenFormAddNew ? 'block' : 'hidden'}  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
            <div className='relative w-full max-w-md bg-white rounded-lg shadow-lg p-5'>
                <div className='mb-6 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Thêm mới ca làm</h1>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full"/>
                </div>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="">
                        <span className='block mb-1 text-base font-medium text-gray-500'>Ca làm</span>
                        <input name="shift" value={formData.shift} onChange={handlInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập ca làm' required />
                        {error.name === 'shift' && (<p className='text-red-500 text-sm'>{error.message}</p>)}
                    </label>
                    <label htmlFor="">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Thời gian</span>
                        <input name="time" value={formData.time} onChange={handlInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập thời gian' required />
                        {error.name === 'time' && (<p className='text-red-500 text-sm'>{error.message}</p>)}
                    </label>
                    <label htmlFor="">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Ghi chú</span>
                        <input name="description" value={formData.description} onChange={handlInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Ghi chú' required />
                    </label>
                </form>
                <div className='flex items-center justify-end space-x-3 mt-6'>
                    <BtnSubmit onClick={handleCloseForm} className={'border border-gray-300 py-2.5 px-5 hover:bg-gray-50'}>
                        Hủy
                    </BtnSubmit>
                    <BtnSubmit onClick={handleSubmit} className={'bg-blue-600 text-white py-2.5 px-5'}>
                        Lưu
                    </BtnSubmit>
                </div>
            </div>
        </div>
    )
}

export default FormAddNew
