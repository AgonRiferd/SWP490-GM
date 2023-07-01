import React, { useMemo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { View, Edit, Delete } from '../../components/gymer/dialog';
import COLUMNS from '../../components/gymer/Columns';
import AdvanceTable from '../../flagments/advance-table';
import axios from 'axios';
import { LoadingTable } from '../../flagments/loading-table';

const DATA_PARAM_ROLE_NAME = 'gymer';

const MemberManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const columns = useMemo(() => COLUMNS, []);
    const sortees = useMemo(
        () => [
            {
                id: "fullname",
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
            const response = await api.get('/Accounts/GetAllAccountsWithConditons', {
                params: {
                    role: DATA_PARAM_ROLE_NAME
                }
            });
            //Fetch thành công
            const { data } = response.data;
            setData(data);
            setIsLoading(false); // Kết thúc quá trình fetch
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
        dialogEdit: { title: "Trạng thái", component: Edit },
        dialogView: { title: "Thông tin", component: View },
        dialogDelete: { title: "Loại bỏ", component: Delete, fetchData: fetchData}
    }), []);

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
                        <span>Thành Viên</span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Thành Viên
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

export default MemberManage;