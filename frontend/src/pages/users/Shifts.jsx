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

const ShiftsContext = () => {
  const {
    isOpenFormAddNew,
    handleOpenFormAddNew,
    handleCloseFormAddNew
  } = useOpenFormAddNew()
  const {
    isOpenModelDelete,
    handleOpenModelDelete,
    handleCloseModelDelete
  } = useOpenModalDelete()
  const {
    isOpenFormEdit,
    handleOpenFormEdit,
    handleCloseFormEdit
  } = useOpenFormEdit()

  const { shifts, deleteShift, pagination, setPage } = useShiftContext()

  const [keyword, setKeyword] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(false)

  const shiftsData = keyword
    ? (shifts?.docs || []).filter(shift =>
        shift?.shift?.toLowerCase().includes(keyword) ||
        shift?.time?.toLowerCase().includes(keyword) ||
        shift?.description?.toLowerCase().includes(keyword)
      )
    : (shifts?.docs || [])

  const [btnClick, setBtnClick] = useState([])
  const [selectedShift, setSelectedShift] = useState(null)

  const handleDeleteShift = async () => {
    try {
      await deleteShift(btnClick)
      handleCloseModelDelete()
      toast.success('Xóa thành công')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = page => {
    setPage(page)
  }

  const handleEditShift = shift => {
    handleOpenFormEdit()
    setSelectedShift(shift)
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-70">
          <InputSearch
            onSearch={value => {
              setKeyword(value.toLowerCase())
              setSearchTriggered(true)
            }}
          />
        </div>
        <div>
          <BtnSubmit
            onClick={handleOpenFormAddNew}
            className="bg-blue-600 text-white py-3 px-4.5"
          >
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
