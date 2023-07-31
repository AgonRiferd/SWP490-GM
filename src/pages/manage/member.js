import React, { useMemo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Edit, Delete } from '../../components/gymer/dialog';
import CustomView from '../../components/gymer/View';
import COLUMNS from '../../components/gymer/Columns';
import { AdvanceTable } from '../../flagments/advance-table';
import { LoadingTable } from '../../flagments/loading-table';
import axiosInstance from '../../utils/axiosConfig';

const DATA_PARAM_ROLE_NAME = 'gymer';

const MemberManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataView, setDataView] = useState(null);
    const columns = useMemo(() => COLUMNS, []);
    const sortees = useMemo(
        () => [
            {
                id: "fullname",
                desc: false
            }
        ], []
    );

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Fetch data from the API and update the state
            const response = await axiosInstance.get('/Accounts/GetAllAccountsWithConditons', {
                params: {
                    role: DATA_PARAM_ROLE_NAME
                }
            });
            //Fetch thành công
            if (response.status === 200) {
                const { data } = response.data;
                setData(data);
            }
            setIsLoading(false); // Kết thúc quá trình fetch
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <span>Mã lỗi: {error.code}</span>
                    </>
                );
            }
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // [] để chỉ gọi fetchData khi component được mount lần đầu

    const dialogs = useMemo(() => ({
        dialogEdit: {
            title: "Trạng thái",
            icon: <i className="fa-solid fa-user-lock"></i>,
            component: Edit,
            fetchData: fetchData
        },
        dialogDelete: {
            title: "Loại bỏ",
            icon: <i className="fa-solid fa-trash"></i>,
            component: Delete,
            fetchData: fetchData
        }
    }), []);

    const viewData = useMemo(() => ({
        title: "Thông tin",
        icon: <i className="fa-solid fa-eye"></i>,
        setDataView: setDataView
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
                    <AdvanceTable data={data} columns={columns} sortees={sortees} dialogs={dialogs} viewData={viewData} />
                </div>
            )}
            {dataView &&
                <> 
                    <CustomView dataUser={dataView} isMainLoading={isLoading} setDataView={setDataView} />
                </>
            }
        </>
    )
}

export default MemberManage;