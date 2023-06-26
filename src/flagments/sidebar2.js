import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';

const SideBar2 = () => {
    return (
        <Sidebar rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: 'red',
            },
          }}> 
            <Menu>
                <SubMenu label="Charts" icon={<i className="fa-solid fa-home fa-sidebar-icon fa-custom" />}>
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
                <SubMenu label="Charts" icon={<i className="fa-solid fa-home fa-sidebar-icon fa-custom" />}>
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}

export default SideBar2;