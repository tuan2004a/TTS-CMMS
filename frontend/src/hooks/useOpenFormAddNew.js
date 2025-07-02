import { useState } from 'react';

const useOpenFormAddNew = () => {

    const [isOpenFormAddNew, setIsOpenFormAddNew] = useState(false);
    const handleOpenFormAddNew = () => setIsOpenFormAddNew(true);
    const handleCloseFormAddNew = () => setIsOpenFormAddNew(false);

    return {
        isOpenFormAddNew,
        setIsOpenFormAddNew,
        handleOpenFormAddNew,
        handleCloseFormAddNew,
    };
}

export default useOpenFormAddNew;