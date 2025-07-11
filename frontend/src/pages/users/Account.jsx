// components/users/Account.jsx
import React from 'react';
import Cols from '../../components/table/Cols';
import Rows from '../../components/table/Rows';
import BtnAction from '../../components/common/button/BtnAction';
import InputSeach from '../../components/common/input/InputSeach';
import BtnSubmit from '../../components/common/button/BtnSubmit';
import UsersManagement from './Index';
import DeleteModal from '../../components/modal/DeleteModal';
import useOpenModelDelete from '../../hooks/useOpenModelDelete';
import FormAddNew from '../../components/users/account/FormAddNew';
import { AccountProvider,useAccountContext } from '../../context/accountContext';
import { Pagination } from 'antd';

const AccountContent = () => {
    const {isOpenModelDelete,handleOpenModelDelete,handleCloseModelDelete,} = useOpenModelDelete();
    const { accounts, pagination, setPage } = useAccountContext();
    const accountData = accounts?.docs || [];
    console.log(accountData)

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap">
                <div className="w-70">
                    <InputSeach />
                </div>
                <div>
                    <BtnSubmit className={'bg-blue-600 text-white py-3 px-4.5'}>
                        <i className="fa-solid fa-plus text-xs mr-2"></i>
                        Thêm mới
                    </BtnSubmit>
                </div>
            </div>
            <div className="overflow-x-scroll">
                <table className="text-left mt-5 w-full min-w-[850px] table-auto">
                    <thead>
                    <tr className="text-gray-500 text-[15px] font-medium border-b border-gray-200">
                        <th className="font-semibold pr-6 py-3 text-nowrap hidden">Id</th>
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

                        {accountData?.length > 0 && accountData?.map((items,index)=>(
                            <Cols key={index}>
                                <Rows>{items?.name}</Rows>
                                <Rows>{items?.email}</Rows>
                                <Rows>{items?.phone}</Rows>
                                <Rows>{items?.roleId}</Rows>
                                <Rows>{items?.status}</Rows>
                                <Rows>{items?.departmentId}</Rows>
                                <Rows  className="block space-x-2">
                                    <BtnAction dataTooltip="Chỉnh sửa" className="bg-[#36fe00]">
                                    <i className="fa-solid fa-file-pen"></i>
                                    </BtnAction>
                                    <BtnAction onClick={handleOpenModelDelete} dataTooltip="Xóa" className="bg-red-500">
                                    <i className="fa-solid fa-trash-can"></i>
                                    </BtnAction>
                                </Rows>
                            </Cols>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    current={pagination?.currentPage}
                    total={pagination?.totalDocs}
                    pageSize={pagination?.limit}
                    onChange={(page) => setPage(page)}
                />
            </div>

            <div>
                <DeleteModal isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} onOpen={handleOpenModelDelete} />
            </div>
            <div>
                <FormAddNew/>
            </div>
        </div>
    );
};

const Account = () => {
    return (
        <AccountProvider>
            <UsersManagement>
                <AccountContent />
            </UsersManagement>
        </AccountProvider>
    );
};

export default Account;