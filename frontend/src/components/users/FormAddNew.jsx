import React from 'react'
import BtnClostX from '../common/button/BtnClostX';
import BtnSubmit from '../common/button/BtnSubmit';

const FormAddNew = ({handleCloseFormAddNew, isOpenFormAddNew}) => {
    return (
        <div className={`${isOpenFormAddNew ? 'block' : 'hidden'}  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full bg-black/70 backdrop-blur-[3px] flex items-center justify-center`}>
            <div className='relative w-full max-w-md bg-white rounded-lg shadow-lg p-5'>
                <div className='mb-6 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Thêm mới ca làm</h1>
                    <BtnClostX onClick={handleCloseFormAddNew} className="size-8 text-xl hover:bg-gray-200 text-gray-500 rounded-full"/>
                </div>
                <form action="">
                    <label htmlFor="">
                        <span className='block mb-1 text-base font-medium text-gray-500'>Ca làm</span>
                        <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Nhập ca làm' required />
                    </label>
                    <div className='flex items-center justify-between mt-4 gap-4'>
                        <label htmlFor="" className='w-full'>
                            <span className='block mb-1 text-base font-medium text-gray-500'>Thời gian bắt đầu</span>
                            <input type="time" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Chọn thời gian' required />
                        </label>
                        <label htmlFor="" className='w-full'>
                            <span className='block mb-1 text-base font-medium text-gray-500'>Thời gian kết thúc</span>
                            <input type="time" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Chọn thời gian' required />
                        </label>
                    </div>
                    <label htmlFor="">
                        <span className='mt-4 block mb-1 text-base font-medium text-gray-500'>Ghi chú</span>
                        <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full p-2.5' placeholder='Ghi chú' required />
                    </label>
                </form>
                <div className='flex items-center justify-end space-x-3 mt-6'>
                    <BtnSubmit onClick={handleCloseFormAddNew} className={'border border-gray-300 py-2.5 px-5 hover:bg-gray-50'}>
                        Hủy
                    </BtnSubmit>
                    <BtnSubmit className={'bg-blue-600 text-white py-2.5 px-5'}>
                        Lưu
                    </BtnSubmit>
                </div>
            </div>
        </div>
    )
}

export default FormAddNew
