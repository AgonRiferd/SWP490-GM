import React from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axiosConfig';

export const PageLoader = ({ setIsLoading, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    useEffect(() => {
        const verifyToken = async (token) => {
            try {
                await axios.get('/Login/getPhoneNoAndID', {
                    headers: {
                        Authorization: 'bearer ' + token
                    }
                });
                console.log("Token work!");
                setIsAuthenticated(true);
                setIsLoading(false);
            } catch (error) {
                alert("Your token has expired or invalid.")
                cookies.remove("token");
                setIsLoading(false);
                navigate("/login");
            }
        };

        if (token) {
            verifyToken(token);
        } else {
            setIsLoading(false);
            navigate("/login");
        }
    });

    return (
        <>
            <div className="page-loading">
                <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="React" width={300} height={300} />
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang kết nối đến máy chủ...</span>
                </div>
            </div>
        </>
    )
}