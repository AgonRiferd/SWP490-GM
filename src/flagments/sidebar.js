import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './logo';

const Sidebar = ({ handleCollapsed, hasCollapsed }) => {
    const [activeNavItem, setActiveNavItem] = useState(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleDocumentClick = (e) => {
            // Kiểm tra nếu click chuột ngoài sidebar
            if (hasCollapsed && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                // Nếu click ngoài, bỏ activeNavItem
                setActiveNavItem(null);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [hasCollapsed]);

    const handleMenuClick = (navItem) => {
        activeNavItem === navItem ? setActiveNavItem(null) : setActiveNavItem(navItem);
    };

    const isMenuItemActive = (navItem) => {
        return activeNavItem === navItem && !hasCollapsed ? 'active' : '';
    };

    const angleArrow = (navItem) => {
        return hasCollapsed ?
            (activeNavItem === navItem ? 'fa-angle-left' : 'fa-angle-right')
            :
            (activeNavItem === navItem ? 'fa-angle-down' : 'fa-angle-right');
    }

    const btnArrow = () => {
        return hasCollapsed ? 'fa-angle-right' : 'fa-angle-left'
    }

    return (
        <>
            <div className='sidebar-header'>
                <Logo>
                    <img src="/logo0.png" alt='logo0' />
                </Logo>
            </div>
            <section className='sidebar' id='menu' ref={sidebarRef}>
                <ul className='nav'>
                    <li>
                        <button className="btn btn-collapse" onClick={() => handleCollapsed()} type='button'>
                            <span className={`fa ${btnArrow()}`}></span>
                        </button>
                    </li>
                    {/**Dashboard*/}
                    <li className={hasCollapsed ? 'menu-dropdown' : ''}>
                        <NavLink end to="/" onClick={() => handleMenuClick('dashboard')}>
                            <i className="fa-solid fa-home fa-sidebar-icon fa-custom"></i>
                            <span className='title'>Trang Chủ</span>
                            <span className="arrow"></span>
                        </NavLink>
                        {hasCollapsed &&
                            <ul className='sub-menu'>
                                <li className='sub-menu-title'>
                                    <span>Trang Chủ</span>
                                </li>
                            </ul>
                        }
                    </li>
                    {/**Management*/}
                    <li className={`menu-dropdown ${isMenuItemActive('management')}`}>
                        <a href="##" onClick={() => handleMenuClick('management')}>
                            <i className="fa-solid fa-gear fa-sidebar-icon fa-custom"></i>
                            <span className='title'>Quản Lý</span>
                            {!hasCollapsed &&
                                <span className={`fa pull-right ${angleArrow('management')}`}></span>
                            }
                        </a>
                        <ul className='sub-menu'>
                            {hasCollapsed &&
                                <li className='sub-menu-title'>
                                    <span>Quản lý</span>
                                </li>
                            }
                            <li>
                                <NavLink to="/management/gymer">
                                    <i className="fa-solid fa-user fa-sidebar-icon fa-custom"></i>
                                    <span className='title'>Thành Viên</span>
                                    <span className="arrow"></span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/management/pt">
                                    <i className="fa-solid fa-user-tie fa-sidebar-icon fa-custom"></i>
                                    <span className='title'>Huấn Luyện Viên</span>
                                    <span className="arrow"></span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/management/ne">
                                    <i className="fa-solid fa-user-tie fa-sidebar-icon fa-custom"></i>
                                    <span className='title'>Bác Sỹ Dinh Dưỡng</span>
                                    <span className="arrow"></span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/management/package">
                                    <i className="fa-solid fa-box-archive fa-sidebar-icon fa-custom"></i>
                                    <span className='title'>Gói Tập</span>
                                    <span className="arrow"></span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    {/**Dashboard*/}
                    <li className={hasCollapsed ? 'menu-dropdown' : ''}>
                        <NavLink to="/report" onClick={() => handleMenuClick('dashboard')}>
                            <i className="fa-solid fa-box fa-sidebar-icon fa-custom"></i>
                            <span className='title'>Danh Sách Gói Bán</span>
                            <span className="arrow"></span>
                        </NavLink>
                        {hasCollapsed &&
                            <ul className='sub-menu'>
                                <li className='sub-menu-title'>
                                    <span>Danh Sách Gói Bán</span>
                                </li>
                            </ul>
                        }
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Sidebar;