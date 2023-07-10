import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../flagments/header";
import Sidebar from "../flagments/sidebar";
import Footer from "../flagments/footer";

const PrivateRoute = ({setIsAuthenticated}) => {
    return (
        <>
            <div className='content-container'>
                <aside className='left-side'>
                    <Sidebar />
                </aside>
                <aside className="right-side">
                    <Header setIsAuthenticated={setIsAuthenticated} />
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