import React, { useEffect, useState } from 'react';
import BtnSubmit from '../../common/button/BtnSubmit';
import BtnClostX from '../../common/button/BtnClostX';
import { useAccountContext } from '../../../context/accountContext';
import { showSuccess, showError } from '../../../utils/toast';

const FormEditData = ({isOpen, handleCloseForm, accountData}) => {
    const { updateAccount } = useAccountContext();

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        email: '',
        phone: '',
        status: 'isActive',
        roleId: '',
        shiftsId: [],
        departmentId: []
    });

    useEffect(() => {
        if (accountData) {
            // Extract the correct data structure from accountData
            setFormData({
                code: accountData.code || '',
                name: accountData.name || '',
                email: accountData.email || '',
                phone: accountData.phone || '',
                status: accountData.status || 'isActive',
                // Ensure roleId is a string ID, not an object
                roleId: typeof accountData.roleId === 'object' && accountData.roleId?._id ? 
                        accountData.roleId._id : accountData.roleId || '',
                // Ensure shiftsId and departmentId are arrays
                shiftsId: accountData.shiftsId || [],
                departmentId: accountData.departmentId || []
            });
        }
    }, [accountData]);

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
            // Prepare the data for update - omit password field entirely
            const updateData = {
                code: formData.code,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                roleId: formData.roleId,
                shiftsId: Array.isArray(formData.shiftsId) ? formData.shiftsId : [],
                departmentId: Array.isArray(formData.departmentId) ? formData.departmentId : []
            };
            
            await updateAccount(accountData._id, updateData);
            handleCloseForm();
            showSuccess("Cập nhật người dùng thành công");
        } catch {
            showError("Cập nhật người dùng thất bại");
        }
    };

    return (
        <div className={`${isOpen? "flex" : "hidden"}  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
            <div className='relative w-full max-w-md bg-white rounded-lg shadow-lg p-5'>
                <div className='mb-6 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Sửa thông tin người dùng</h1>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full"/>
                </div>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="code">
                        <span className='block mb-1 text-base font-medium text-gray-500'>Mã nhân viên</span>
                        <input 
                            id="code"
                            name="code" 
                            value={formData.code} 
                            onChange={handleChange} 
                            type="text" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' 
                            placeholder='Nhập mã nhân viên' 
                            required 
                        />
                    </label>
                    <label htmlFor="name">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Họ tên</span>
                        <input 
                            id="name"
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            type="text" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' 
                            placeholder='Nhập họ tên' 
                            required 
                        />
                    </label>
                    <label htmlFor="email">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Email</span>
                        <input 
                            id="email"
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            type="email" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' 
                            placeholder='Nhập email' 
                            required 
                        />
                    </label>
                    <label htmlFor="phone">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Số điện thoại</span>
                        <input 
                            id="phone"
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            type="tel" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' 
                            placeholder='Nhập số điện thoại' 
                            required 
                        />
                    </label>
                    <label htmlFor="status">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Trạng thái</span>
                        <select 
                            id="status"
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' 
                            required
                        >
                            <option value="isActive">Hoạt động</option>
                            <option value="isInActive">Không hoạt động</option>
                        </select>
                    </label>
                    <label htmlFor="roleId">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Vai trò</span>
                        <input 
                            id="roleId"
                            name="roleId" 
                            value={formData.roleId} 
                            onChange={handleChange} 
                            type="text" 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' 
                            placeholder='Chọn vai trò' 
                            required 
                        />
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
    );
};

export default FormEditData;