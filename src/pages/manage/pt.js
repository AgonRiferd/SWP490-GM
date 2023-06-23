import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import DATA from '../../components/pt/DATA.json'
import COLUMNS from '../../components/pt/Columns';
import { Create, Edit, Delete } from '../../components/pt/dialog';
import AdvanceTable from '../../flagments/advance-table'

const PTManage = () => {

    const data = useMemo(() => DATA, []);
    const columns = useMemo(() => COLUMNS, []);
    const sortees = useMemo(
        () => [
            { 
                id: "name", 
                desc: false 
            }
        ], []
    )

    const dialogs = useMemo(() => ({
        dialogCreate: { title: "Tạo mới", component: Create },
        dialogEdit: { title: "Chỉnh sửa", component: Edit },
        dialogDelete: { title: "Loại bỏ", component: Delete }
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
                        <span>
                            <b>Nhân Viên: PT</b>
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Huấn Luyện Viên
                </span>
            </div>
            <div className="list-content">
                <AdvanceTable data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
            </div>
        </>
    )
}

export default PTManage;