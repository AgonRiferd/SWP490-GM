import React, { createRef, useEffect, useMemo, useState } from "react";
import Logo from "./logo";

const Header = ({ setAuthenticated }) => {
    const [activeItem, setActiveItem] = useState(null);
    const dropdownRefs = useMemo(() => ({
        notifications: createRef(null), user: createRef(null)}),[]
    );

    useEffect(() => {
        // Add event listener to handle clicks outside the dropdown
        const handleClickItem = (e) => {
            const clickedItem = Object.values(dropdownRefs).every(
              (ref) => ref.current && !ref.current.contains(e.target)
            );
            if (clickedItem) {
              setActiveItem(null);
            }
        };
    
        document.addEventListener('click', handleClickItem);
    
        return () => {
          // Clean up the event listener when the component is unmounted
          document.removeEventListener('click', handleClickItem);
        };
    }, [dropdownRefs]);
    
    const handleItemClick = (itemId) => {
        setActiveItem((prevItem) => (prevItem === itemId ? null : itemId));
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('loginData');
        setAuthenticated(false);
    }

    return(
        <header className="header">
            <div className="navbar">
                <Logo />
                <div className="navbar-right">
                    <ul className="nav">
                        <li className={`dropdown notifications ${activeItem === 'notifications' ? 'open' : ''}`}
                        onClick={() => handleItemClick('notifications')} ref={dropdownRefs.notifications}>
                            <a href="##">
                                <i className="fa-solid fa-bell fa-custom"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-messages">
                                <li className="dropdown-title">You have 0 notifications</li>
                                <li>
                                    <div className="notification-empty">
                                        <h2>Nothing new</h2>
                                    </div>
                                </li>
                                <li className="dropdown-footer">View All Notifications</li>
                            </ul>
                        </li>
                        <li className={`dropdown user ${activeItem === 'user' ? 'open' : ''}`}
                        onClick={() => handleItemClick('user')} ref={dropdownRefs.user}>
                            <a href="##" className="padding-user">
                                <i className="fa-solid fa-circle-user fa-user fa-custom"></i>
                                <div className="profile">
                                    <div>
                                        Admin
                                        <span>
                                            <i className="caret"></i>
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="##">
                                        <i className="fa fa-fw fa-gear"></i> 
                                        Account Settings
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li className="user-footer">
                                    <a href="##" onClick={logout}>
                                        <i className="fa fa-fw fa-sign-out"></i> Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>   
                </div>
            </div>
        </header>
    );
}

export default Header;