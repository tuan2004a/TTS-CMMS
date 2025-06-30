// components/users/Account.jsx
import React from 'react';
import Cols from '../table/Cols';
import Rows from '../table/Rows';
import BtnAction from '../common/button/BtnAction';
import TablePagination from '../table/TablePagination';
import InputSeach from '../common/input/InputSeach';
import BtnSubmit from '../common/button/BtnSubmit';

import { useUserContext } from '../../context/userContext';
import UserProvider from '../../pages/Users';

const Account = () => {
    const { users } = useUserContext();
    const usersData = users || [];

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
                {usersData.map((user) => (
                    <Cols key={user.id}>
                    <Rows>{user.id}</Rows>
                    <Rows>{user.name}</Rows>
                    <Rows>{user.email}</Rows>
                    <Rows>{user.phone}</Rows>
                    <Rows>{user.role}</Rows>
                    <Rows>{user.status}</Rows>
                    <Rows>{user.department}</Rows>
                    <Rows className="block space-x-2">
                        <BtnAction dataTooltip="Chỉnh sửa" className="bg-[#36fe00]">
                        <i className="fa-solid fa-file-pen"></i>
                        </BtnAction>
                        <BtnAction dataTooltip="Xóa" className="bg-red-500">
                        <i className="fa-solid fa-trash-can"></i>
                        </BtnAction>
                    </Rows>
                    </Cols>
                ))}
                </tbody>
            </table>
            <TablePagination />
            </div>
        </div>
    );
};

export default Account;