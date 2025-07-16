<<<<<<< HEAD
import React, { useState } from 'react'
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
=======
import React, { useState } from "react";
import InputSearch from "../../components/common/input/InputSearch";
import BtnSubmit from "../../components/common/button/BtnSubmit";
import Cols from "../../components/table/Cols";
import Rows from "../../components/table/Rows";
import BtnAction from "../../components/common/button/BtnAction";
import InputCheckBoxStatus from "../../components/common/input/InputCheckBoxStatus";
import UsersManagement from "./Index";
import { ShiftProvider, useShiftContext } from "../../context/shiftContext";
import FormAddNew from "../../components/users/shift/FormAddNew";
import useOpenFormAddNew from "../../hooks/useOpenFormAddNew";
import ModalDelete from "../../components/modal/DeleteModal";
import useOpenModalDelete from "../../hooks/useOpenModelDelete";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import FormEditData from "../../components/users/shift/FormEditData";
import useOpenFormEdit from "../../hooks/useOpenFormEdit";
>>>>>>> aa48bf97dda279eb82d45608b115ed91ba34621c

const ShiftsContext = () => {
    // Form state hooks
    const { isOpenFormAddNew, handleOpenFormAddNew, handleCloseFormAddNew } = useOpenFormAddNew();
    const { isOpenModelDelete, handleOpenModelDelete, handleCloseModelDelete } = useOpenModalDelete();
    const { isOpenFormEdit, handleOpenFormEdit, handleCloseFormEdit } = useOpenFormEdit();

    // Context data and methods
    const { shifts, deleteShift, pagination, setPage, loadShifts } = useShiftContext();

    // Local state
    const [keyword, setKeyword] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [btnClick, setBtnClick] = useState([]);
    const [selectedShift, setSelectedShift] = useState(null);

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
                            <th className="font-semibold pr-6 py-3 text-nowrap">Trạng thái</th>
                            <th className="font-semibold pr-6 py-3 text-nowrap">Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts?.docs?.length > 0
                            ? shifts.docs.map((item, index) => (
                                  <Cols key={item._id || index}>
                                      <Rows>{item?.shift}</Rows>
                                      <Rows>{item?.time}</Rows>
                                      <Rows>{item?.description}</Rows>
                                      <Rows className="overflow-hidden">
                                          <InputCheckBoxStatus className="size-5 ml-1" />
                                      </Rows>
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
                            : searchTriggered && (
                                  <tr>
                                      <td colSpan="5" className="py-5 text-center text-red-500 font-medium">
                                          Không tìm thấy kết quả phù hợp với từ khóa đã nhập.
                                      </td>
                                  </tr>
                              )}
                    </tbody>
                </table>

                {pagination?.totalDocs > 0 && (
                    <Pagination 
                        current={pagination?.currentPage} 
                        total={pagination?.totalDocs} 
                        pageSize={pagination?.limit} 
                        onChange={handleChange} 
                    />
                )}
            </div>

            <FormAddNew isOpenFormAddNew={isOpenFormAddNew} handleCloseFormAddNew={handleCloseFormAddNew} />
            <FormEditData isOpen={isOpenFormEdit} handleCloseForm={handleCloseFormEdit} shiftData={selectedShift} />
            <ModalDelete onDelete={handleDeleteShift} isOpenModelDelete={isOpenModelDelete} onClose={handleCloseModelDelete} />
        </div>
<<<<<<< HEAD
      </div>

      <div className="mt-5 overflow-x-scroll">
        <table className="text-left w-full mt-5 min-w-[850px] table-auto">
          <thead>
            <tr className="text-gray-500 text-[15px] leading-normal font-medium border-b border-gray-200">
              <th className="font-semibold pr-6 py-3 text-nowrap">Ca làm</th>
              <th className="font-semibold pr-6 py-3 text-nowrap">Thời gian ca</th>
              <th className="font-semibold pr-6 py-3 text-nowrap">Ngày làm</th>
              <th className="font-semibold pr-6 py-3 text-nowrap">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {shiftsData.length > 0 ? (
              shiftsData.map((items, index) => (
                <Cols key={index}>
                  <Rows>{items?.shift}</Rows>
                  <Rows>{items?.time}</Rows>
                  <Rows>{items?.description}</Rows>
                  <Rows className="block space-x-2">
                    <BtnAction
                      onClick={() => handleEditShift(items)}
                      dataTooltip="Chỉnh sửa"
                      className="bg-[#36fe00]"
                    >
                      <i className="fa-solid fa-file-pen"></i>
                    </BtnAction>
                    <BtnAction
                      onClick={() => {
                        handleOpenModelDelete()
                        setBtnClick(items?._id)
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
              searchTriggered && (
                <tr>
                  <td colSpan="5" className="py-5 text-center text-red-500 font-medium">
                    Không tìm thấy dữ liệu.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <Pagination
          current={pagination?.currentPage}
          total={pagination?.totalDocs}
          pageSize={pagination?.limit}
          onChange={handleChange}
        />
      </div>

      <FormAddNew
        isOpenFormAddNew={isOpenFormAddNew}
        handleCloseFormAddNew={handleCloseFormAddNew}
      />

      <FormEditData
        isOpen={isOpenFormEdit}
        handleCloseForm={handleCloseFormEdit}
        shiftData={selectedShift}
      />

      <ModalDelete
        onDelete={handleDeleteShift}
        isOpenModelDelete={isOpenModelDelete}
        onClose={handleCloseModelDelete}
      />
    </div>
  )
}
=======
    );
};
>>>>>>> aa48bf97dda279eb82d45608b115ed91ba34621c

const Shifts = () => {
    return (
        <ShiftProvider>
            <UsersManagement>
                <ShiftsContext />
            </UsersManagement>
        </ShiftProvider>
    );
};

export default Shifts;
