// components/users/Account.jsx
import React from 'react';
import Cols from '../../components/table/Cols';
import Rows from '../../components/table/Rows';
import BtnAction from '../../components/common/button/BtnAction';
// import TablePagination from '../../components/table/TablePagination';
import InputSeach from '../../components/common/input/InputSeach';
import BtnSubmit from '../../components/common/button/BtnSubmit';
import UsersManagement from './Index';

import { UserProvider, useUserContext } from '../../context/userContext';
import DeleteModal from '../../components/modal/DeleteModal';
import useOpenModelDelete from '../../hooks/useOpenModelDelete';
// import FormAddNew from '../../components/form/FormAddNew';

const AccountContent = () => {
    const { users } = useUserContext();
    const usersData = users || [];
    // console.log(usersData)

    const {isOpenModelDelete,handleOpenModelDelete,handleCloseModelDelete,} = useOpenModelDelete();

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
                    <th className="font-semibold pr-6 py-3 text-nowrap">Id</th>
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
                {usersData?.length > 0 && usersData?.map((user,index) => (
                    <Cols key={index}>
                        <Rows>{index+1}</Rows>
                        <Rows>{user?.name}</Rows>
                        <Rows>{user?.email}</Rows>
                        <Rows>{user?.phone}</Rows>
                        <Rows>{user?.role}</Rows>
                        <Rows>{user?.status}</Rows>
                        <Rows>{user?.department}</Rows>
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
            {/* <TablePagination /> */}
            </div>

            <div>
                <DeleteModal isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} onOpen={handleOpenModelDelete} />
            </div>
            {/* <div>
                <FormAddNew/>
            </div> */}
        </div>
    );
};

const Account = () => {
    return (
        <UserProvider>
            <UsersManagement>
                <AccountContent />
            </UsersManagement>
        </UserProvider>
    );
};

export default Account;