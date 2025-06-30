import { useState } from 'react';

const useOpenSidebarResponsive = () => {

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const handleOpenSidebar = () => setIsOpenSidebar(true);
    const handleCloseSidebar = () => setIsOpenSidebar(false);

    return {
        isOpenSidebar,
        setIsOpenSidebar,
        handleOpenSidebar,
        handleCloseSidebar,
    };
}

export default useOpenSidebarResponsive;