import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from '../utils/axiosConfig';

export const PageLoader = ({ setIsLoading, setIsAuthenticated }) => {
    const [status, setStatus] = useState('Đang kết nối đến máy chủ...');
    const cookies = new Cookies();
    const token = cookies.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get('/Login/getPhoneNoAndID', {
                    headers: {
                        Authorization: 'bearer ' + token
                    }
                });
                setIsAuthenticated(true);
            } catch (error) {
                cookies.remove("token");
                console.log("Your token has expired or invalid.");
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            setStatus('Đang kiểm tra token...');
            verifyToken();
        } else {
            setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="page-loading">
                <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="React" width={300} height={300} />
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>{status}</span>
                </div>
            </div>
        </>
    )
}