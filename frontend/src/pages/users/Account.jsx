// components/users/Account.jsx
import React, { useState } from 'react';
import Cols from '../../components/table/Cols';
import Rows from '../../components/table/Rows';
import BtnAction from '../../components/common/button/BtnAction';
import InputSearch from '../../components/common/input/InputSearch';
import BtnSubmit from '../../components/common/button/BtnSubmit';
import UsersManagement from './Index';
import DeleteModal from '../../components/modal/DeleteModal';
import useOpenModelDelete from '../../hooks/useOpenModelDelete';
import FormAddNew from '../../components/users/account/FormAddNew';
import FormEditData from '../../components/users/account/FormEditData';
import { AccountProvider, useAccountContext } from '../../context/accountContext';
import { Pagination } from 'antd';
import { showSuccess, showError } from '../../utils/toast';
import useOpenFormAddNew from '../../hooks/useOpenFormAddNew';
import useOpenFormEdit from '../../hooks/useOpenFormEdit';
import { ShiftProvider } from '../../context/shiftContext';

const AccountContent = () => {
    const { isOpenModelDelete, handleOpenModelDelete, handleCloseModelDelete } = useOpenModelDelete();
    const { isOpenFormAddNew, handleOpenFormAddNew, handleCloseFormAddNew } = useOpenFormAddNew();
    const { isOpenFormEdit, handleOpenFormEdit, handleCloseFormEdit } = useOpenFormEdit();
    const { deleteAccount, accounts, pagination, LoadAccount } = useAccountContext();

    const accountData = accounts?.docs || [];

    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(selectedAccountId);
            handleCloseModelDelete();
            showSuccess('Xóa thành công');
        } catch {
            showError('Xóa thất bại');
        }
    };

    const handleEditClick = (account) => {
        setSelectedAccount(account);
        handleOpenFormEdit();
    };

    const handleDeleteClick = (accountId) => {
        setSelectedAccountId(accountId);
        handleOpenModelDelete();
    };

    const handlePageChange = (page) => {
        LoadAccount({ p: page });
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap">
                <div className="w-70">
                    <InputSearch />
                </div>
                <div>
                    <BtnSubmit onClick={handleOpenFormAddNew} className={'bg-blue-600 text-white py-3 px-4.5'}>
                        <i className="fa-solid fa-plus text-xs mr-2"></i>
                        Thêm mới
                    </BtnSubmit>
                </div>
            </div>
            <div className="overflow-x-scroll">
                <table className="text-left mt-5 w-full min-w-[850px] table-auto">
                    <thead>
                    <tr className="text-gray-500 text-[15px] font-medium border-b border-gray-200">
                        <th className="font-semibold pr-6 py-3 text-nowrap ">Mã nhân viên</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Tên</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Email</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">SĐT</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Vai trò</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Trạng thái</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Bộ phận</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Hành động</th>
                    </tr>
                    </thead>
                    <tbody className="w-full">
                        {accountData?.length > 0 && accountData.map((item, index) => (
                            <Cols key={index}>
                                <Rows>{item?.code}</Rows>
                                <Rows>{item?.name}</Rows>
                                <Rows>{item?.email}</Rows>
                                <Rows>{item?.phone}</Rows>
                                <Rows>{item?.roleId?.role}</Rows>
                                <Rows>{item?.status}</Rows>
                                <Rows>{item?.departmentId}</Rows>
                                <Rows className="block space-x-2">
                                    <BtnAction onClick={() => handleEditClick(item)} dataTooltip="Chỉnh sửa" className="bg-[#36fe00]">
                                        <i className="fa-solid fa-file-pen"></i>
                                    </BtnAction>
                                    <BtnAction onClick={() => handleDeleteClick(item?._id)} dataTooltip="Xóa" className="bg-red-500">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </BtnAction>
                                </Rows>
                            </Cols>
                        ))}
                    </tbody>
                </table>
                {pagination && (
                    <Pagination
                        current={pagination.page}
                        total={pagination.totalDocs}
                        pageSize={pagination.limit}
                        onChange={handlePageChange}
                    />
                )}
            </div>

            <DeleteModal 
                onDelete={handleDeleteAccount} 
                isOpenModelDelete={isOpenModelDelete} 
                onClose={handleCloseModelDelete} 
                onOpen={handleOpenModelDelete} 
            />
            
            <FormAddNew 
                isOpenFormAddNew={isOpenFormAddNew} 
                handleCloseFormAddNew={handleCloseFormAddNew} 
            />  
            
            <FormEditData 
                isOpen={isOpenFormEdit} 
                handleCloseForm={handleCloseFormEdit} 
                accountData={selectedAccount} 
            />
        </div>
    );
};

const Account = () => {
    return (
        <ShiftProvider>
            <AccountProvider>
                <UsersManagement>
                    <AccountContent />
                </UsersManagement>
            </AccountProvider>
        </ShiftProvider>
    );
};

export default Account;