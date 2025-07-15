import React, { useState } from 'react';
import BtnClostX from '../../common/button/BtnClostX';
import BtnSubmit from '../../common/button/BtnSubmit';
import { useRoleContext } from '../../../context/roleContext';
import { showSuccess, showError } from '../../../utils/toast';
import { roleValidate } from '../../../form/Validations/Role.validate';

const FormAddNew = ({ handleCloseFormAddNew, isOpenFormAddNew }) => {
    const { createRole } = useRoleContext();

    const initialFormData = {
        name: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState({ name: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCloseForm = () => {
        setFormData(initialFormData);
        setError({ name: '', message: '' });
        handleCloseFormAddNew();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = roleValidate(formData);
        if (validation) {
            setError(validation);
            return;
        }

        try {
            const response = await createRole(formData);
            if (response?.result) {
                showSuccess('Thêm vai trò thành công');
                handleCloseForm();
            } else {
                showError(response?.msg || 'Thêm vai trò thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi thêm vai trò:', error);
            showError('Thêm vai trò thất bại');
        }
    };

    return (
        <div className={`${isOpenFormAddNew ? 'block' : 'hidden'} fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] flex items-center justify-center`}>
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Thêm mới vai trò</h2>
                    <BtnClostX onClick={handleCloseForm} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Tên vai trò</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-600"
                            placeholder="Nhập tên vai trò"
                            required
                        />
                        {error.name === 'name' && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Mô tả</label>
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-600"
                            placeholder="Nhập mô tả vai trò"
                        />
                    </div>
                </form>

                <div className="flex justify-end items-center gap-3 mt-6">
                    <BtnSubmit onClick={handleCloseForm} className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100">
                        Hủy
                    </BtnSubmit>
                    <BtnSubmit onClick={handleSubmit} className="bg-blue-600 text-white px-5 py-2 rounded">
                        Lưu
                    </BtnSubmit>
                </div>
            </div>
        </div>
    );
};

export default FormAddNew;
