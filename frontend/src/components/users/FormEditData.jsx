import React, { useEffect, useState } from 'react';
import BtnSubmit from '../common/button/BtnSubmit';
import BtnClostX from '../common/button/BtnClostX';
import { useShiftContext } from '../../context/shiftContext';
import { showSuccess } from '../../utils/toast';

const FormEditData = ({isOpen,handleCloseForm, shiftData}) => {

    const {updateShift} = useShiftContext();

    const [formData, setFormData] = useState({
        shift: '',
        time: '',
        description: '',
    });

    useEffect(() => {
        if (shiftData) {
            setFormData({
                shift: shiftData.shift || '',
                time: shiftData.time || '',
                description: shiftData.description || '',
            });
        }
    }, [shiftData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateShift(shiftData._id, formData);
            handleCloseForm();
            showSuccess("Cập nhật thành công");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${isOpen? "flex" : "hidden"}  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
            <div className='relative w-full max-w-md bg-white rounded-lg shadow-lg p-5'>
                <div className='mb-6 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Sửa chữa thông tin</h1>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full"/>
                </div>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="">
                        <span className='block mb-1 text-base font-medium text-gray-500'>Ca làm</span>
                        <input name="shift"  value={formData.shift} onChange={handleChange}  type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập ca làm' required />
                        {/* {error.name === 'shift' && (<p className='text-red-500 text-sm'>{error.message}</p>)} */}
                    </label>
                    <label htmlFor="">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Thời gian</span>
                        <input name="time" value={formData.time} onChange={handleChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập thời gian' required />
                        {/* {error.name === 'time' && (<p className='text-red-500 text-sm'>{error.message}</p>)} */}
                    </label>
                    <label htmlFor="">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Ghi chú</span>
                        <input name="description" value={formData.description} onChange={handleChange}  type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Ghi chú' required />
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

export default FormEditData