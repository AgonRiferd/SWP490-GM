import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import COLUMNS from '../../components/ne/Columns';
import { Create, Delete, Edit } from '../../components/ne/dialog';
import AdvanceTable from '../../flagments/advance-table';
import axios from 'axios';
import { LoadingTable } from '../../flagments/loading-table';
import CustomView from '../../components/ne/View';

const DATA_PARAM_ROLE_NAME = 'ne';

const NEManage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataView, setDataView] = useState();
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
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <span>Mã lỗi: {error.code}</span>
                    </>
                );
            }
        } finally {
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // [] để chỉ gọi fetchData khi component được mount lần đầu

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
        },
        dialogDelete: { 
            title: "Loại bỏ", 
            icon: <i className="fa-solid fa-trash"></i>, 
            component: Delete 
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
                <span className="status-error">{errorMessage}</span>
            ) : (
                <div className="list-content">
                    <AdvanceTable data={data} columns={columns} sortees={sortees} dialogs={dialogs} viewData={viewData}/>
                </div>
            )}
            {dataView && 
                <CustomView dataUser={dataView} isMainLoading={isLoading} />
            }
        </>
    )
}

export default NEManage;