import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import DATA from '../../components/ne/DATA.json'
import COLUMNS from '../../components/ne/Columns';
import { Create, View, Delete } from '../../components/ne/dialog';
import AdvanceTable from '../../flagments/advance-table'

const NEManage = () => {

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
        dialogView: {title:"Thông tin", component: View},
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
                            <b>Nhân Viên: NE</b>
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Bác Sỹ Dinh Dưỡng
                </span>
            </div>
            <div className="list-content">
                <AdvanceTable data={data} columns={columns} sortees={sortees} dialogs={dialogs} />
            </div>
        </>
    )
}

export default NEManage;