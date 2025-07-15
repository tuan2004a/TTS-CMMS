//compponent/account/FormAddNew.jsx

import React, { useState } from 'react';
import BtnSubmit from '../../common/button/BtnSubmit';
import BtnClostX from '../../common/button/BtnClostX';
import { useAccountContext } from '../../../context/accountContext';
import { Select } from 'antd';
import { AccountValidate } from '../../../form/Validations/Account.validate';

import { showSuccess } from '../../../utils/toast';

const FormAddNew = ({ isOpenFormAddNew, handleCloseFormAddNew }) => {

    const { createAccount } = useAccountContext();
    const initialFormData = {
        code: '',
        name: '',
        email: '',
        phone: '',
        status: 'isActive',
        role: '',
        Departments: '',
    };
    const [error, setError] = useState({
        name: "",
        message: ""
    })

    const [formData, setFormData] = useState(initialFormData);

    const handleCloseForm = () => {
        setFormData(initialFormData);
        handleCloseFormAddNew();
        setError({
            name: "",
            message: ""
        })
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        const errorValidate = AccountValidate(formData);
        if (errorValidate) {
            setError(errorValidate);
            return;
        }
        
        e.preventDefault();
        try {
            createAccount(formData);
            handleCloseForm();
            showSuccess('Thêm người dùng thành công');
            setFormData(initialFormData);
            setError({
                name: "",
                message: ""
            })
        } catch (error) {
            console.log(error);
            showError('Thêm người dùng thất bại thất bại');
            throw error;
        }
    };

    const onChange = value => {
        console.log(`selected ${value}`);
    };
    const onSearch = value => {
        console.log('search:', value);
    };


    return (
        <div className={`${isOpenFormAddNew ? 'block' : 'hidden'}  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
            <div className='relative w-full max-w-xl bg-white rounded-lg shadow-lg p-5'>
                <div className='mb-6 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Thêm mới người dùng</h1>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full" />
                </div>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="code" className='w-full'>
                        <span className='block text-base font-medium text-gray-500'>Mã nhân viên</span>
                        <input name="code" value={formData.code || ''} onChange={handleInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập mã nhân viên' required />
                        {error.name === 'code' && (<p className='text-red-500 text-sm'>{error.message}</p>)}
                    </label>
                    <div className='flex items-center justify-between gap-5 mt-5 w-full'>
                        <label htmlFor="name" className='w-full'>
                            <span className='block text-base font-medium text-gray-500'>Tên</span>
                            <input name="name" value={formData.name || ''} onChange={handleInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập tên' required />
                            {error.name === 'name' && (<p className='text-red-500 text-sm'>{error.message}</p>)}
                        </label>
                        <label htmlFor="email" className='w-full'>
                            <span className='block text-base font-medium text-gray-500'>Email</span>
                            <input name="email" value={formData.email || ''} onChange={handleInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập email' required />
                            {error.name === 'email' && (<p className='text-red-500 text-sm'>{error.message}</p>)}
                        </label>
                    </div>
                    <div className='flex items-center justify-between gap-5 mt-5 w-full'>
                        <label htmlFor="phone" className='w-full'>
                            <span className='block text-base font-medium text-gray-500'>SĐT</span>
                            <input name="phone" value={formData.phone || ''} onChange={handleInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập ca làm' required />
                            {error.name === 'phone' && (<p className='text-red-500 text-sm'>{error.message}</p>)}
                        </label>
                        <label htmlFor="password" className='w-full'>
                            <span className='block text-base font-medium text-gray-500'>Mật khẩu</span>
                            <input name="password" value={formData.password || ''} onChange={handleInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập mật khẩu' required />
                        </label>
                    </div>
                    <label htmlFor="Departments" className='w-full'>
                        <span className='mt-5 block text-base font-medium text-gray-500'>Bộ phận</span>
                        <input name="Departments" value={formData.Departments || ''} onChange={handleInputChange} type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập quyền' required />
                    </label>
                    <label>
                        <span className='mt-5 block text-base font-medium text-gray-500'>Vai trò</span>
                        <Select
                            className="w-full"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="label"
                            onChange={onChange}
                            onSearch={onSearch}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </label>
                </form>
                <div className='flex items-center justify-end space-x-3 mt-6'>
                    <BtnSubmit onClick={handleCloseForm} className={'border border-gray-300 py-2.5 px-5 hover:bg-gray-50'}>
                        Hủy
                    </BtnSubmit>
                    <BtnSubmit onClick={handleSubmit} type="submit" className={'bg-blue-600 text-white py-2.5 px-5'}>
                        Lưu
                    </BtnSubmit>
                </div>
            </div>
        </div>
    )
}

export default FormAddNew