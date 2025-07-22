//pages/works/Work.jsx
import React, { useState } from "react";
import WorksManagement from "./Index";
import { WorkProvider, useWorkContext } from "../../context/workContext";
import BtnSubmit from "../../components/common/button/BtnSubmit";
import Cols from "../../components/table/Cols";
import Rows from "../../components/table/Rows";
import { Pagination } from "antd";
import BtnAction from "../../components/common/button/BtnAction";
import InputSearch from "../../components/common/input/InputSearch";
import FormNewAdd from "../../components/works/FormNewAdd";
import { AccountProvider } from "../../context/accountContext";
import useOpenFormAddNew from "../../hooks/useOpenFormAddNew";
import { ShiftProvider } from "../../context/shiftContext";
import { format } from "date-fns";
import ModalDelete from "../../components/modal/DeleteModal";
import useOpenModelDelete from '../../hooks/useOpenModelDelete';
import useOpenFormEdit from "../../hooks/useOpenFormEdit";
import FormEditData from "../../components/works/FormEditData";

const WorkContext = () => {
    const {isOpenFormAddNew, handleOpenFormAddNew, handleCloseFormAddNew } = useOpenFormAddNew();
    const {isOpenFormEdit, handleOpenFormEdit, handleCloseFormEdit  } = useOpenFormEdit()
    const {isOpenModelDelete,handleOpenModelDelete,handleCloseModelDelete, } = useOpenModelDelete();

    const { works, pagination, setPage, loadWorks, deleteWork } = useWorkContext();
    const worksData = works || [];
    // console.log(worksData)

    const [keyword, setKeyword] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [btnDelete, setBtnDelete] = useState([]);
    const [selectedShift, setSelectedShift] = useState([]);

    const handleEditWork = (work) => {
        setSelectedShift(work);
        handleOpenFormEdit();
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleSearch = async (value) => {
        setKeyword(value.toLowerCase());
        setSearchTriggered(true);
        setPage(1);
        try {
            await loadWorks({ page: 1, keyword: value });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchByEmployee = async () => {
        if (!keyword.trim()) return;

        setSearchTriggered(true);
        setPage(1);
        try {
            // Perform search by both name and code
            const result = await loadWorks({ page: 1, keyword, searchField: "both" });
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteWork = async () => {
        try {
            await deleteWork(btnDelete);
            await loadWorks();
            handleCloseModelDelete();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap">
                <div className="flex gap-2">
                    <InputSearch onSearch={handleSearch} onClear={() => handleSearch("")} placeholder="Nhập từ khóa tìm kiếm" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <BtnSubmit onClick={handleSearchByEmployee} className="bg-green-600 text-white py-3 px-4 whitespace-nowrap">
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
                            <th className="font-semibold pr-6 py-3 text-nowrap">Mã nhân viên</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Nhân viên</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Ca làm</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Thời gian làm</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Xưởng</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Máy sản xuất</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {worksData?.docs?.length > 0 ? (
                            worksData?.docs?.map((item, index) => (
                                <Cols key={index} className="w-full">
                                    <Rows>{item.name.code}</Rows>
                                    <Rows>{item.name.name}</Rows>
                                    <Rows className="flex flex-col">
                                        <span>{item.shift.shift}</span>
                                        <span>({item.shift.time})</span>
                                    </Rows>
                                    <Rows>
                                        {(() => {
                                            const dayTime = item?.dayTime || [];
                                            const validDates = dayTime.filter(Boolean);
                                            const formatted = validDates.map((date) => format(new Date(date), "dd/MM/yyyy"));

                                            if (formatted.length >= 2) {
                                                return `${formatted[0]} - ${formatted[formatted.length - 1]}`;
                                            } else if (formatted.length === 1) {
                                                return formatted[0];
                                            } else {
                                                return "";
                                            }
                                        })()}
                                    </Rows>
                                    <Rows>{item.factory}</Rows>
                                    <Rows>{item.machines?.join(", ")}</Rows>
                                    <Rows className="flex space-x-2">
                                        <BtnAction onClick={()=>  handleEditWork(item)} dataTooltip="Chỉnh sửa" className="bg-[#36fe00]">
                                            <i className="fa-solid fa-file-pen"></i>
                                        </BtnAction>
                                        <BtnAction onClick={() => {handleOpenModelDelete(),setBtnDelete(item._id)}} dataTooltip="Xóa" className="bg-[#fe3636]">
                                            <i className="fa-solid fa-trash"></i>
                                        </BtnAction>
                                    </Rows>
                                </Cols>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-5 text-center text-gray-500 font-medium">
                                    {searchTriggered ? "Không tìm thấy kết quả phù hợp với từ khóa đã nhập." : "Chưa có dữ liệu ca làm. Vui lòng thêm mới."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div>
                    <FormNewAdd isOpenFormAddNew={isOpenFormAddNew} handleCloseFormAddNew={handleCloseFormAddNew} />
                </div>

                <div>
                    <FormEditData worksData={selectedShift} isOpenFormEdit={isOpenFormEdit} handleCloseForm={handleCloseFormEdit} />
                </div>

                <div>
                    <ModalDelete onDelete={handleDeleteWork}  isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} />
                </div>

                <div className="mt-4 flex justify-center">
                    <Pagination onChange={handlePageChange} current={pagination?.currentPage} total={pagination?.totalDocs} pageSize={pagination?.limit} />
                </div>
            </div>
        </div>
    );
};

const Works = () => {
    return (
        <ShiftProvider>
            <AccountProvider>
                <WorkProvider>
                    <WorksManagement>
                        <WorkContext />
                    </WorksManagement>
                </WorkProvider>
            </AccountProvider>
        </ShiftProvider>
    );
};

export default Works;
