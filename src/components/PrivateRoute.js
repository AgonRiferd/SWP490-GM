import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Header from "../flagments/header";
import Sidebar from "../flagments/sidebar";
import Footer from "../flagments/footer";

const PrivateRoute = ({setIsAuthenticated}) => {
    const [hasCollapsed, setHasCollapsed] = useState(false);

    const handleCollapsed = () => {
        setHasCollapsed(!hasCollapsed);
    };

    const isCollapsed = () => {
        return hasCollapsed === true ? 'collapsed' : '';
    };

    return (
        <>
            <div className='content-container'>
                <aside className={`left-side ${isCollapsed()}`}>
                    <Sidebar handleCollapsed={handleCollapsed}  hasCollapsed={hasCollapsed}/>
                </aside>
                <aside className={`right-side ${isCollapsed()}`}>
                    <Header setIsAuthenticated={setIsAuthenticated}/>
                    <div className="content">
                        <div className="inner-content">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </aside>
            </div>
        </>
    )
}

export default PrivateRoute;