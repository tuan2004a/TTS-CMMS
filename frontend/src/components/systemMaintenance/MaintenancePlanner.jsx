import React from 'react';
import SystemMaintenance from '../../pages/SystemMaintenance';
import Cols from '../table/Cols';
import Rows from '../table/Rows';
import InputCheckBoxStatus from '../common/input/InputCheckBoxStatus';
import BtnAction from '../common/button/BtnAction';


const MaintenancePlanner = () => {
    return (
        <SystemMaintenance>
            <div>
                <div className=' overflow-x-scroll'>
                    <table className='text-left w-full mt-5 min-w-[850px] table-auto'>
                        <thead>
                            <tr className='text-gray-500 text-[15px] leading-normal font-medium border-b border-gray-200'>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Bộ phận</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Vai trò</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Mô tả</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Thành viên</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Trạng thái</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='w-full '>
                            <Cols>
                                <Rows>
                                    Dữ liệu sản xuất
                                </Rows>
                                <Rows>
                                    Dữ liệu sản xuất
                                </Rows>
                                <Rows>
                                    Dữ liệu sản xuất
                                </Rows>
                                <Rows>
                                    Nguyễn Văn A
                                </Rows>
                                <Rows className='overflow-hidden'>
                                    <InputCheckBoxStatus className='size-5 ml-1'/>
                                </Rows>
                                <Rows className='block space-x-2'>
                                    <BtnAction dataTooltip="Chỉnh sửa" className='bg-[#36fe00]'>
                                        <i className="fa-solid fa-file-pen"></i>
                                    </BtnAction>
                                    <BtnAction dataTooltip="Xóa" className='bg-red-500'>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </BtnAction>
                                </Rows>
                            </Cols>
                        </tbody>
                    </table>
                </div>
            </div>
        </SystemMaintenance>
    )
}

export default MaintenancePlanner