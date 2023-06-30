import React from 'react';
import { NavLink } from 'react-router-dom';
import Calendar from '../components/schedule/calendar';

const CalendarPage = () => {

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
                        <span>Lịch Trình</span>
                    </li>
                </ol>
                <span className="title">
                    Lịch Trình
                </span>
            </div>
            <div className="list-content">
                <Calendar />
            </div>
        </>
    )
}

export default CalendarPage;