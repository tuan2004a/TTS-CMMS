import BtnClostX from "../common/button/BtnClostX";
import BtnSubmit from "../common/button/BtnSubmit";

const ModalDelete = ({isOpenModelDelete, onClose, onDelete }) => {

    return (
        <div className={`${isOpenModelDelete?'block':'hidden'}   fixed top-1/2 left-1/2 -translate-1/2 z-50 size-full bg-black/70 backdrop-blur-[3px]`}>
            <div className='relative p-4 max-w-md max-h-full top-1/2 left-1/2 -translate-1/2 bg-white rounded-lg'>
                <BtnClostX onClick={onClose} className="absolute top-3 right-5 text-gray-400 size-8 text-xl hover:bg-gray-200 hover:text-gray-500"/>
                <div className="p-4 text-center">
                    <svg className="mx-auto mb-4 text-red-500 size-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-600">Bạn có chắc chắn muốn xóa sản phẩm này không?</h3>
                    <BtnSubmit onClick={onDelete} type="button" className={'bg-red-600 hover:bg-red-500 text-white text-sm focus:ring-4 focus:ring-red-300 px-5 py-2.5'}>
                        Chắc chắn
                    </BtnSubmit>
                    <BtnSubmit onClick={onClose} on type="button" className={'bg-white hover:bg-gray-200 text-gray-900 text-sm focus:ring-4 focus:ring-gray-300 ms-3 px-5 py-2.5 border border-gray-500'}>
                        Hủy xóa
                    </BtnSubmit>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete
