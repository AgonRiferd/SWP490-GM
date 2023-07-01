import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import COLUMNS from "../../components/package/Columns";
import { Create, Edit, Delete, View } from "../../components/package/dialog";
import AdvanceTable from '../../flagments/advance-table';
import { useEffect } from 'react';
import axios from 'axios';
import { LoadingTable } from '../../flagments/loading-table';

const PackageManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const columns = useMemo(() => COLUMNS, []);
    const sortees = useMemo(
        () => [
            { 
                id: "price", 
                desc: false 
            }
        ], []
    )

    const fetchData = async () => {
        const api = axios.create({
            baseURL: 'https://egts.azurewebsites.net/api',
        });

        try {
            setIsLoading(true);
            // Fetch data from the API and update the state
            const response = await api.get('/Packages');
            //Fetch thành công
            if (response.status === 200) {
                const { data } = response.data;
                setData(data);
            }
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } finally {
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // [] để chỉ gọi fetchData khi component được mount lần đầu

    const dialogs = useMemo(() => ({
        dialogCreate: { title: "Tạo mới", component: Create, fetchData: fetchData },
        dialogView: {title:"Thông tin", component: View},
        dialogEdit: { title: "Chỉnh sửa", component: Edit },
        dialogDelete: { title: "Loại bỏ", component: Delete, fetchData: fetchData }
    }),[]);

    return (
        <>
            <div className='content-header'>
                <ol className="breadcrumb">
                    <li>
                        <NavLink end to="/">
                            <i className="fa fa-fw fa-home"></i>
                            <span>Trang Chủ</span>
                        </NavLink>
                    </li>
                    <li>
                        <span>Quản Lý</span>
                    </li>
                    <li>
                        <span>Dịch Vụ</span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Dịch Vụ
                </span>
            </div>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <div className="list-content">
                    <AdvanceTable data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
                </div>
            )}
        </>
    )
}

export default PackageManage;