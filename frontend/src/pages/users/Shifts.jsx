import React, { useState } from 'react'
import InputSeach from '../../components/common/input/InputSeach'
import BtnSubmit from '../../components/common/button/BtnSubmit'
import Cols from '../../components/table/Cols'
import Rows from '../../components/table/Rows'
import BtnAction from '../../components/common/button/BtnAction'
import InputCheckBoxStatus from '../../components/common/input/InputCheckBoxStatus'
import UsersManagement from './Index'
import TablePagination from '../../components/table/TablePagination'
import { ShiftProvider, useShiftContext } from '../../context/shiftContext'
import FormAddNew from '../../components/users/FormAddNew';
import useOpenFormAddNew from '../../hooks/useOpenFormAddNew';
import ModalDelete from '../../components/modal/DeleteModal';
import useOpenModalDelete from '../../hooks/useOpenModelDelete';
import { toast } from 'react-toastify'


const ShiftsContext = () => {
    const { shifts, deleteShift } = useShiftContext();
    const shiftsData = shifts?.docs || [];
    // console.log(shifts)

    const [btnDelete, setBtnDelete] = useState([]);

    const handleDeleteShift = async() => {
        try {
            await deleteShift(btnDelete);
            handleCloseModelDelete();
            
            toast.success('Xóa thành công');
        } catch (error) {
            console.log(error);
        }
    }

    const {isOpenFormAddNew,handleOpenFormAddNew,handleCloseFormAddNew} = useOpenFormAddNew();
    const {isOpenModelDelete,handleOpenModelDelete,handleCloseModelDelete} = useOpenModalDelete();

    return (
        <div>
            <div className='flex items-center justify-between flex-wrap'>
                <div className='w-70 '>
                    <InputSeach/>
                </div>
                <div>
                    <BtnSubmit onClick={handleOpenFormAddNew} className={'bg-blue-600 text-white py-3 px-4.5'}>
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
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Thời gian ca</th>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Nghi chú</th>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Trạng thái</th>
                            <th className='font-semibold pr-6 py-3 text-nowrap'>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        { shiftsData?.length > 0 && shiftsData?.map((items,index)=>(
                            // {console.log(items)}
                            <Cols key={index}>
                                <Rows>
                                    {items?.shift}
                                </Rows>
                                <Rows>
                                    {items?.time}
                                </Rows>
                                <Rows>
                                    {items?.description}
                                </Rows>
                                <Rows className='overflow-hidden'>
                                    <InputCheckBoxStatus className='size-5 ml-1'/>
                                </Rows>
                                <Rows className='block space-x-2'>
                                    <BtnAction  dataTooltip="Chỉnh sửa" className='bg-[#36fe00]'>
                                        <i className="fa-solid fa-file-pen"></i>
                                    </BtnAction>
                                    <BtnAction  onClick={() => {handleOpenModelDelete(); setBtnDelete(items?._id)}} dataTooltip="Xóa" className='bg-red-500'>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </BtnAction>
                                </Rows>
                            </Cols>
                        ))}
                    </tbody>
                </table>    
                <TablePagination  />
            </div>
            <div>
                <FormAddNew isOpenFormAddNew={isOpenFormAddNew} handleCloseFormAddNew={handleCloseFormAddNew}   />
            </div>
            <div>
                <ModalDelete onDelete={handleDeleteShift} isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} />
            </div>
        </div>
    )
}

const Shifts = () => {
    return (
        <ShiftProvider>
            <UsersManagement>
                <ShiftsContext />
            </UsersManagement>
        </ShiftProvider>
    );
};


export default Shifts
