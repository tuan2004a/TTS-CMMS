import { useState } from 'react';

const useOpenFormEdit = () => {
    const [isOpenFormEdit, setIsOpenFormEdit] = useState(false);
    const handleOpenFormEdit = () => {
        setIsOpenFormEdit(true);
    };
    const handleCloseFormEdit = () => {
        setIsOpenFormEdit(false);
    };
    return {
        isOpenFormEdit,
        handleOpenFormEdit,
        handleCloseFormEdit,
    };
}
export default useOpenFormEdit