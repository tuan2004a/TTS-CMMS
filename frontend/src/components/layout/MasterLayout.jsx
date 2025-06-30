import React from 'react';
import { Breadcrumb, Layout, Menu, Button } from 'antd';
const { Header, Content, Sider } = Layout;

import SideBar from './SideBar';
import NavBar from './NavBar';
import useOpenSidebarResponsive from '../../hooks/useOpenSidebarResponsive';

const MasterLayout = ({ children,menuInfo }) => {

    const {isOpenSidebar,setIsOpenSidebar} = useOpenSidebarResponsive()

    return (
        <Layout>
            <Sider className='!fixed !bg-[#0D0E12] !h-screen top-0 left-0 z-40' breakpoint='lg' collapsible collapsed={isOpenSidebar} onCollapse={setIsOpenSidebar} trigger={null} collapsedWidth='0' width={256}>
                <SideBar  menuInfo={menuInfo}/>
            </Sider>
            <Layout>
                <Header className='fixed !px-10 !bg-white top-0 right-0 flex items-center justify-between w-full lg:!w-[calc(100%_-_256px)]' style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1),', zIndex: 30 }}>
                    <Button onClick={()=>setIsOpenSidebar(!isOpenSidebar)} icon={<i className="fa-solid fa-bars-staggered"></i>} className={`${isOpenSidebar ? '' : '!ml-64'}  !text-2xl lg:!hidden`} />
                    <NavBar />
                </Header>
                <Content className='!mt-[64px] !ml-0 !px-7 !py-7 lg:!ml-64'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MasterLayout
