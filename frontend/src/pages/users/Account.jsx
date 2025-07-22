// components/users/Account.jsx
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
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

/**
 * Component hiển thị nội dung quản lý tài khoản người dùng
 */
const AccountContent = () => {
    const { isOpenModelDelete, handleOpenModelDelete, handleCloseModelDelete } = useOpenModelDelete();
    const { isOpenFormAddNew, handleOpenFormAddNew, handleCloseFormAddNew } = useOpenFormAddNew();
    const { isOpenFormEdit, handleOpenFormEdit, handleCloseFormEdit } = useOpenFormEdit();
    const { deleteAccount, accounts, pagination, loadAccount, searchAccounts, keyword } = useAccountContext();

    const accountData = accounts?.docs || [];

    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(keyword || '');
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Đồng bộ searchKeyword khi keyword từ context thay đổi
    useEffect(() => {
        setSearchKeyword(keyword || '');
    }, [keyword]);

    /**
     * Xử lý xóa tài khoản
     */
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(selectedAccountId);
            handleCloseModelDelete();
            showSuccess('Xóa thành công');
        } catch {
            showError('Xóa thất bại');
        }
    };

    /**
     * Xử lý khi click vào nút chỉnh sửa
     * @param {Object} account - Thông tin tài khoản cần chỉnh sửa
     */
    const handleEditClick = (account) => {
        setSelectedAccount(account);
        handleOpenFormEdit();
    };

    /**
     * Xử lý khi click vào nút xóa
     * @param {string} accountId - ID tài khoản cần xóa
     */
    const handleDeleteClick = (accountId) => {
        setSelectedAccountId(accountId);
        handleOpenModelDelete();
    };

    /**
     * Xử lý khi thay đổi trang
     * @param {number} page - Số trang
     */
    const handlePageChange = (page) => {
        loadAccount({ p: page });
    };

    /**
     * Xử lý khi tìm kiếm
     * @param {string} searchTerm - Từ khóa tìm kiếm
     */
    const handleSearch = (searchTerm) => {
        setSearchKeyword(searchTerm);
        searchAccounts(searchTerm);
    };

    /**
     * Xử lý khi xóa từ khóa tìm kiếm
     */
    const handleClear = () => {
        setSearchKeyword('');
        searchAccounts('');
    };

    /**
     * Xử lý khi thay đổi giá trị ô tìm kiếm
     * @param {Event} e - Event thay đổi giá trị
     */
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value);
        
        // Clear timeout nếu đang có
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Set timeout mới để tìm kiếm sau khi người dùng ngừng nhập 500ms
        const timeoutId = setTimeout(() => {
            searchAccounts(value);
        }, 500);
        
        setSearchTimeout(timeoutId);
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap">
                <div className="w-70">
                    <InputSearch 
                        onSearch={handleSearch} 
                        onClear={handleClear}
                        placeholder="Tìm theo tên"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
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
                        <th className="font-semibold pr-6 py-3 text-nowrap">Bộ phận</th>
                        <th className="font-semibold pr-6 py-3 text-nowrap">Hành động</th>
                    </tr>
                    </thead>
                    <tbody className="w-full">
                        {accountData?.length > 0 ? (
                            accountData.map((item, index) => (
                                <Cols key={index}>
                                    <Rows>{item?.code}</Rows>
                                    <Rows>{item?.name}</Rows>
                                    <Rows>{item?.email}</Rows>
                                    <Rows>{item?.phone}</Rows>
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    {searchKeyword ? "Không tìm thấy người dùng phù hợp" : "Không có dữ liệu người dùng"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {pagination && pagination.totalDocs > 0 && (
                    <Pagination
                        current={pagination.page}
                        total={pagination.totalDocs}
                        pageSize={pagination.limit}
                        onChange={handlePageChange}
                        className="mt-4 flex justify-end"
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

/**
 * Component chính quản lý tài khoản
 */
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

export default memo(Account);