import React from 'react';
import { NavLink } from 'react-router-dom';

const MemberManage = () => {

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
            <div className="list-content">

            </div>
        </>
    )
}

export default MemberManage;