import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import COLUMNS from '../../components/ne/Columns';
import { Create, Edit } from '../../components/ne/dialog';
import { AdvanceTable, LoadingTable } from '../../flagments/advance-table';
import CustomView from '../../components/ne/View';
import axiosInstance from '../../utils/axiosConfig';

const DATA_PARAM_ROLE_NAME = 'ne';

const NEManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataView, setDataView] = useState();
    const columns = useMemo(() => COLUMNS, []);
    const initialState =  useMemo (() => ({ 
        sortBy: [
            {
                id: "fullname",
                desc: false
            }
        ]
    }), []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Fetch
            const response = await axiosInstance.get('/Accounts/GetAllAccountsWithConditons', {
                params: {
                    role: DATA_PARAM_ROLE_NAME
                }
            });
            //Fetch thành công (Chấp nhận code: 2xx)
            const { data } = response.data;
            if (data)
                setData(data);
            setIsLoading(false);
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server (Error code: 4xx)
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                    </>
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const dialogs = useMemo(() => ({
        dialogCreate: { 
            title: "Tạo mới", 
            icon: <i className="fa fa-solid fa-user-plus"></i>, 
            component: Create, 
            fetchData: fetchData 
        },
        dialogEdit: { 
            title: "Trạng thái", 
            icon: <i className="fa-solid fa-user-lock"></i>, 
            component: Edit,
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
                        <span>
                            <b>Nhân Viên: Bác Sỹ Dinh Dưỡng</b>
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Bác Sỹ Dinh Dưỡng
                </span>
            </div>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">
                    {errorMessage}
                </span>
            ) : (
                <div className="list-content">
                    <AdvanceTable 
                        data={data} 
                        columns={columns} 
                        initialState={initialState} 
                        dialogs={dialogs} 
                        viewData={viewData}
                    />
                </div>
            )}
            {dataView && 
                <CustomView 
                    dataUser={dataView}
                    isMainLoading={isLoading}
                    setDataView={setDataView}
                />
            }
        </>
    )
}

export default NEManage;