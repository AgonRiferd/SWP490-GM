import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export const SideBar = () => {
    return (
        <Sidebar>
            <Menu iconShape="square">
                <MenuItem>Menu 1</MenuItem>
                <SubMenu title="Menu 2">
                    <MenuItem>Submenu 2.1</MenuItem>
                    <MenuItem>Submenu 2.2</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}