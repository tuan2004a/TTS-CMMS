<<<<<<< HEAD
=======
//compponent/shift/FormAddNew.jsx
>>>>>>> aa48bf97dda279eb82d45608b115ed91ba34621c
import React, { useState } from 'react'
import BtnClostX from '../../common/button/BtnClostX'
import BtnSubmit from '../../common/button/BtnSubmit'
import { useShiftContext } from '../../../context/shiftContext'
import { showSuccess, showError } from '../../../utils/toast'
import { shiftValidate } from '../../../form/Validations/Shift.validate'

<<<<<<< HEAD
const FormAddNew = ({ handleCloseFormAddNew, isOpenFormAddNew }) => {
  const { createShift } = useShiftContext()
=======

const FormAddNew = ({handleCloseFormAddNew, isOpenFormAddNew}) => {
>>>>>>> aa48bf97dda279eb82d45608b115ed91ba34621c

  const [error, setError] = useState({ name: '', message: '' })
  const [showDayDropdown, setShowDayDropdown] = useState(false)

  const allDays = [
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
    'Chủ Nhật'
  ]

  const initialFormData = {
    shift: '',
    time: '',
    description: [],
    status: true
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDayChange = (e) => {
    const { value, checked } = e.target
    let updated = [...formData.description]
    if (checked) {
      updated.push(value)
    } else {
      updated = updated.filter(day => day !== value)
    }
    setFormData({ ...formData, description: updated })
  }

  const handleCloseForm = () => {
        setFormData(initialFormData)
        setError({ name: '', message: '' })
        handleCloseFormAddNew()
    }

    const handleSubmit = async (e) => {
    e.preventDefault()

    const errorValidate = shiftValidate(formData)
    if (errorValidate) {
        setError(errorValidate)
        return
    }

    try {
        const orderedDays = [
        'Thứ Hai',
        'Thứ Ba',
        'Thứ Tư',
        'Thứ Năm',
        'Thứ Sáu',
        'Thứ Bảy',
        'Chủ Nhật'
        ]

        // Sắp xếp theo đúng thứ tự tuần
        const sortedDescription = orderedDays.filter(day =>
        formData.description.includes(day)
        )

        await createShift({ ...formData, description: sortedDescription })
        handleCloseFormAddNew()
        showSuccess('Thêm ca làm việc thành công')
        setFormData(initialFormData)
        setError({ name: '', message: '' })
    } catch (error) {
        console.log(error)
        showError('Thêm ca làm việc thất bại')
        throw error
    }
    }


  return (
    <div className={`${isOpenFormAddNew ? 'block' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-5">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Thêm mới ca làm</h1>
          <BtnClostX
            onClick={handleCloseForm}
            className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Ca làm */}
          <label>
            <span className="block mb-1 text-base font-medium text-gray-500">Ca làm</span>
            <select
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5"
              required
            >
              <option value="">-- Chọn ca làm --</option>
              <option value="Ca hành chính">Ca hành chính</option>
              <option value="Ca sáng">Ca sáng</option>
              <option value="Ca tối">Ca tối</option>
            </select>
            {error.name === 'shift' && <p className="text-red-500 text-sm">{error.message}</p>}
          </label>

          {/* Thời gian */}
          <label>
            <span className="mt-4 block mb-1 text-base font-medium text-gray-500">Thời gian</span>
            <input
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5"
              placeholder="Nhập thời gian"
              required
            />
            {error.name === 'time' && <p className="text-red-500 text-sm">{error.message}</p>}
          </label>

          {/* Ngày làm dạng dropdown với checkbox */}
          <label>
            <span className="mt-4 block mb-1 text-base font-medium text-gray-500">Ngày làm</span>
            <div className="relative">
              <div
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2.5 cursor-pointer select-none"
                onClick={() => setShowDayDropdown(prev => !prev)}
              >
                {formData.description.length > 0
                  ? formData.description.join(', ')
                  : '-- Chọn ngày làm --'}
              </div>

              {showDayDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md max-h-[220px] overflow-y-auto">
                  {allDays.map(day => (
                    <label key={day} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        value={day}
                        checked={formData.description.includes(day)}
                        onChange={handleDayChange}
                        className="mr-2 accent-blue-600"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              )}
            </div>
            {error.name === 'description' && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </label>
        </form>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <BtnSubmit onClick={handleCloseForm} className="border border-gray-300 py-2.5 px-5 hover:bg-gray-50">
            Hủy
          </BtnSubmit>
          <BtnSubmit onClick={handleSubmit} className="bg-blue-600 text-white py-2.5 px-5">
            Lưu
          </BtnSubmit>
        </div>
      </div>
    </div>
  )
}

export default FormAddNew
