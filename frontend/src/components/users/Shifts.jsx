import React from 'react'
import InputSeach from '../common/input/InputSeach'
import BtnSubmit from '../common/button/BtnSubmit'
import Cols from '../table/Cols'
import Rows from '../table/Rows'
import BtnAction from '../common/button/BtnAction'
import InputCheckBoxStatus from '../common/input/InputCheckBoxStatus'
import Users from '../../pages/Users'
import TablePagination from '../table/TablePagination'

const Shifts = () => {
    return (
        <Users>
            <div>
                <div className='flex items-center justify-between flex-wrap'>
                    <div className='w-70 '>
                        <InputSeach/>
                    </div>
                    <div>
                        <BtnSubmit className={'bg-blue-600 text-white py-3 px-4.5'}>
                            <i className="fa-solid fa-plus text-xs mr-2"></i> 
                            Thêm mới
                        </BtnSubmit>
                    </div>
                </div>
                <div className='mt-5 overflow-x-scroll'>
                    <table className='text-left w-full mt-5 min-w-[850px] table-auto'>
                        <thead>
                            <tr className='text-gray-500 text-[15px] leading-normal font-medium border-b border-gray-200'>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Ca làm</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Thời gian</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Trạng thái</th>
                                <th className='font-semibold pr-6 py-3 text-nowrap'>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Cols>
                                <Rows>
                                    ca sáng
                                </Rows>
                                <Rows>
                                    7 giờ - 12 giờ
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
                            <Cols>
                                <Rows>
                                    ca chiều
                                </Rows>
                                <Rows>
                                    13 giờ - 17 giờ
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
                    <TablePagination/>
                </div>
            </div>
        </Users>
    )
}

export default Shifts
