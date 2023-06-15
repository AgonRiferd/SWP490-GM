import React from 'react';
import { NavLink } from 'react-router-dom';

const StaffManage = () => {

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
                            <b>Nhân Viên</b>
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Nhân Viên
                </span>
            </div>
            <div className="staff-list-content">

            </div>
        </>
    )
}

export default StaffManage;