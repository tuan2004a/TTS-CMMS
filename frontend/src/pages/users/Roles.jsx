import React, { useState } from 'react';
import Cols from '../../components/table/Cols';
import Rows from '../../components/table/Rows';
import InputCheckBoxStatus from '../../components/common/input/InputCheckBoxStatus';
import BtnAction from '../../components/common/button/BtnAction';
import InputSearch from '../../components/common/input/InputSearch';
import BtnSubmit from '../../components/common/button/BtnSubmit';
import UsersManagement from './Index';
import { Pagination } from 'antd';
import { toast } from 'react-toastify';

import { RoleProvider, useRoleContext } from '../../context/roleContext';
import useOpenFormAddNew from '../../hooks/useOpenFormAddNew';
import useOpenFormEdit from '../../hooks/useOpenFormEdit';
import useOpenModalDelete from '../../hooks/useOpenModelDelete';

import FormAddNew from '../../components/users/role/FormAddNew';
import FormEditData from '../../components/users/role/FormEditData';
import ModalDelete from '../../components/modal/DeleteModal';

const RolesContext = () => {
    const { roles, pagination, setPage, deleteRole } = useRoleContext();
    const rolesData = Array.isArray(roles?.docs) ? roles.docs : roles || [];

    const { isOpenFormAddNew, handleOpenFormAddNew, handleCloseFormAddNew } = useOpenFormAddNew();
    const { isOpenFormEdit, handleOpenFormEdit, handleCloseFormEdit } = useOpenFormEdit();
    const { isOpenModelDelete, handleOpenModelDelete, handleCloseModelDelete } = useOpenModalDelete();

    const [selectedRole, setSelectedRole] = useState(null);
    const [btnClickId, setBtnClickId] = useState(null);

    const handleChangePage = (page) => {
        setPage(page);
    };

    const handleEditRole = (role) => {
        handleOpenFormEdit();
        setSelectedRole(role);
    };

    const handleDeleteRole = async () => {
        try {
            await deleteRole(btnClickId);
            toast.success('Xóa vai trò thành công');
            handleCloseModelDelete();
        } catch (error) {
            console.error(error);
            toast.error('Xóa vai trò thất bại');
        }
    };

    return (
        <div>
            {/* Header & Search */}
            <div className='flex items-center justify-between flex-wrap'>
                <div className='w-70'>
                    <InputSearch />
                </div>
                <div>
                    <BtnSubmit onClick={handleOpenFormAddNew} className='bg-blue-600 text-white py-3 px-4.5'>
                        <i className="fa-solid fa-plus text-xs mr-2"></i>
                        Thêm mới
                    </BtnSubmit>
                </div>
            </div>

            {/* Table */}
            <div className='mt-5 overflow-x-auto'>
                <table className='w-full min-w-[850px] table-auto text-left'>
                    <thead>
                        <tr className='text-gray-500 text-sm leading-normal font-medium border-b border-gray-200'>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Vai trò</th>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Mô tả</th>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Trạng thái</th>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolesData?.length > 0 ? (
                            rolesData.map((role, index) => (
                                <Cols key={index}>
                                    <Rows>{role.name}</Rows>
                                    <Rows>{role.description}</Rows>
                                    <Rows>
                                        <InputCheckBoxStatus className='size-5 ml-1' />
                                    </Rows>
                                    <Rows className='block space-x-2'>
                                        <BtnAction onClick={() => handleEditRole(role)} dataTooltip="Chỉnh sửa" className='bg-[#36fe00]'>
                                            <i className="fa-solid fa-file-pen"></i>
                                        </BtnAction>
                                        <BtnAction onClick={() => { handleOpenModelDelete(); setBtnClickId(role._id); }} dataTooltip="Xóa" className='bg-red-500'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </BtnAction>
                                    </Rows>
                                </Cols>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center py-5 text-gray-400'>Không có dữ liệu vai trò</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <Pagination
                    className="mt-4"
                    current={pagination?.currentPage || 1}
                    total={pagination?.totalDocs || 0}
                    pageSize={pagination?.limit || 10}
                    onChange={handleChangePage}
                    showSizeChanger={false}
                />
            </div>

            {/* Modals */}
            <FormAddNew isOpenFormAddNew={isOpenFormAddNew} handleCloseFormAddNew={handleCloseFormAddNew} />
            <FormEditData isOpen={isOpenFormEdit} handleCloseForm={handleCloseFormEdit} roleData={selectedRole} />
            <ModalDelete isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} onDelete={handleDeleteRole} />
        </div>
    );
};

const Roles = () => (
    <RoleProvider>
        <UsersManagement>
            <RolesContext />
        </UsersManagement>
    </RoleProvider>
);

export default Roles;
