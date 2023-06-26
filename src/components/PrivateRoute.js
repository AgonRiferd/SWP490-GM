import React from "react";
import { Navigate, Outlet} from 'react-router-dom';
import Header from "../flagments/header";
import Sidebar from "../flagments/sidebar";
import Footer from "../flagments/footer";

const PrivateRoute = ({isAuthenticated, setAuthenticated}) => {
    return isAuthenticated() ? (
        <>
            <div className='content-container'>
                <aside className='left-side'>
                    <Sidebar />
                </aside>
                <aside className="right-side">
                    <Header setAuthenticated={setAuthenticated}/>
                    <div className="content">
                        <div className="inner-content">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </aside>
            </div>
        </>
        ): <Navigate to="/login"/>;
};

export default PrivateRoute;