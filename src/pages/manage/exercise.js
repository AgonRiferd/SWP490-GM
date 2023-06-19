import React from 'react';
import { NavLink } from 'react-router-dom';
import {default as ExcerciseTable} from '../../components/exercises/Table'

const ExercisePage = () => {
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
                            Bài Tập
                        </span>
                    </li>
                </ol>
                <span className="title">
                    Danh Sách Bài Tập
                </span>
            </div>
            <div className="list-content">
                <ExcerciseTable />
            </div>
        </>
    )
}

export default ExercisePage;