import { useState } from 'react';

const useOpenModelDelete = () => {

    const [isOpenModelDelete, setIsOpenModelDelete] = useState(false);
    const handleOpenModelDelete = () => setIsOpenModelDelete(true);
    const handleCloseModelDelete = () => setIsOpenModelDelete(false);

    return {
        isOpenModelDelete,
        setIsOpenModelDelete,
        handleOpenModelDelete,
        handleCloseModelDelete,
    };
}

export default useOpenModelDelete;