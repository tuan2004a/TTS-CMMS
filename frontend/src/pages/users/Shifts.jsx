import React, { useState, useEffect } from 'react'
import InputSearch from '../../components/common/input/InputSearch'
import BtnSubmit from '../../components/common/button/BtnSubmit'
import Cols from '../../components/table/Cols'
import Rows from '../../components/table/Rows'
import BtnAction from '../../components/common/button/BtnAction'
import UsersManagement from './Index'
import { ShiftProvider, useShiftContext } from '../../context/shiftContext'
import FormAddNew from '../../components/users/shift/FormAddNew'
import useOpenFormAddNew from '../../hooks/useOpenFormAddNew'
import ModalDelete from '../../components/modal/DeleteModal'
import useOpenModalDelete from '../../hooks/useOpenModelDelete'
import { toast } from 'react-toastify'
import { Pagination } from 'antd'
import FormEditData from '../../components/users/shift/FormEditData'
import useOpenFormEdit from '../../hooks/useOpenFormEdit'
import InputCheckBoxStatus from '../../components/common/input/InputCheckBoxStatus'

const ShiftsContext = () => {
    // Form state hooks
    const { isOpenFormAddNew, handleOpenFormAddNew, handleCloseFormAddNew } = useOpenFormAddNew();
    const { isOpenModelDelete, handleOpenModelDelete, handleCloseModelDelete } = useOpenModalDelete();
    const { isOpenFormEdit, handleOpenFormEdit, handleCloseFormEdit } = useOpenFormEdit();

    // Context data and methods
    const { shifts, deleteShift, pagination, setPage, loadShifts, isLoading, error } = useShiftContext();

    // Local state
    const [keyword, setKeyword] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [btnClick, setBtnClick] = useState([]);
    const [selectedShift, setSelectedShift] = useState(null);

    // Load data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadShifts();
            } catch (error) {
                console.error("Error loading shifts:", error);
            }
        };
        
        fetchData();
    }, [loadShifts]);

    // Search handlers
    const handleSearch = async (value) => {
        setKeyword(value.toLowerCase());
        setSearchTriggered(true);
        setSearchField("");  
        setPage(1);
        try {
            await loadShifts({ page: 1, keyword: value });
        } catch (error) {
            toast.error("Lỗi khi tìm kiếm: " + error.message);
        }
    };

    const handleSearchByShiftName = async () => {
        setSearchTriggered(true);
        setSearchField("shift");  
        setPage(1);
        try {
            await loadShifts({ page: 1, keyword, searchField: 'shift' });
        } catch (error) {
            toast.error("Lỗi khi tìm kiếm theo ca làm: " + error.message);
        }
    };

    // CRUD operations
    const handleDeleteShift = async () => {
        try {
            await deleteShift(btnClick);
            handleCloseModelDelete();
            toast.success("Xóa thành công");
        } catch (error) {
            toast.error("Lỗi khi xóa: " + error.message);
        }
    };

    // Pagination handler
    const handleChange = async (page) => {
        try {
            setPage(page);
            await loadShifts({ page, keyword, searchField });
        } catch (error) {
            toast.error("Lỗi khi chuyển trang: " + error.message);
        }
    };

    // Edit handler
    const handleEditShift = (shift) => {
        setSelectedShift(shift);
        handleOpenFormEdit();
    };

    // Render loading state
    if (isLoading && !shifts?.docs) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Render error state
    if (error && !shifts?.docs) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Lỗi!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap">
                <div className="w-50 flex gap-2">
                    <InputSearch
                        onSearch={handleSearch}
                        onClear={() => handleSearch("")}
                        placeholder="Tìm kiếm theo ca làm"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <BtnSubmit onClick={handleSearchByShiftName} className="bg-green-600 text-white py-3 px-4 whitespace-nowrap">
                        Tìm kiếm
                    </BtnSubmit>
                </div>
                <div>
                    <BtnSubmit onClick={handleOpenFormAddNew} className="bg-blue-600 text-white py-3 px-4.5">
                        <i className="fa-solid fa-plus text-xs mr-2"></i>
                        Thêm mới
                    </BtnSubmit>
                </div>
            </div>

            <div className="mt-5 overflow-x-scroll">
                <table className="text-left w-full mt-5 min-w-[850px] table-auto">
                    <thead>
                        <tr className="text-gray-500 text-[15px] leading-normal font-medium border-b border-gray-200">
                            <th className="font-semibold pr-6 py-3 text-nowrap">Ca làm</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Thời gian ca</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Ghi chú</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts?.docs?.length > 0 ? (
                            shifts.docs.map((item, index) => (
                                <Cols key={item._id || index}>
                                    <Rows>{item?.shift}</Rows>
                                    <Rows>{item?.time}</Rows>
                                    <Rows>{item?.description}</Rows>
                                    <Rows className="block space-x-2">
                                        <BtnAction onClick={() => handleEditShift(item)} dataTooltip="Chỉnh sửa" className="bg-[#36fe00]">
                                            <i className="fa-solid fa-file-pen"></i>
                                        </BtnAction>
                                        <BtnAction
                                            onClick={() => {
                                                handleOpenModelDelete();
                                                setBtnClick(item?._id);
                                            }}
                                            dataTooltip="Xóa"
                                            className="bg-red-500"
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </BtnAction>
                                    </Rows>
                                </Cols>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-5 text-center text-gray-500 font-medium">
                                    {searchTriggered 
                                        ? "Không tìm thấy kết quả phù hợp với từ khóa đã nhập." 
                                        : "Chưa có dữ liệu ca làm. Vui lòng thêm mới."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {pagination?.totalDocs > 0 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination 
                            current={pagination?.currentPage} 
                            total={pagination?.totalDocs} 
                            pageSize={pagination?.limit} 
                            onChange={handleChange} 
                        />
                    </div>
                )}
            </div>

            <FormAddNew isOpenFormAddNew={isOpenFormAddNew} handleCloseFormAddNew={handleCloseFormAddNew} />
            <FormEditData isOpen={isOpenFormEdit} handleCloseForm={handleCloseFormEdit} shiftData={selectedShift} />
            <ModalDelete onDelete={handleDeleteShift} isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} />
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
    )
}

export default Shifts
