import React from 'react';
import { NavLink } from 'react-router-dom';

const ScheduleManage = () => {

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
                        <span>Thời khóa biểu</span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Thời Khóa Biểu
                </span>
            </div>
            <div className="list-content">

            </div>
        </>
    )
}

export default ScheduleManage;