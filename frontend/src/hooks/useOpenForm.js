import { useState } from 'react';

const useOpenForm = () => {

    const [isOpenForm, setIsOpenForm] = useState(false);
    const handleOpenForm = () => setIsOpenForm(true);
    const handleCloseForm = () => setIsOpenForm(false);

    return {
        isOpenForm,
        setIsOpenForm,
        handleOpenForm,
        handleCloseForm,
    };
}

export default useOpenForm;