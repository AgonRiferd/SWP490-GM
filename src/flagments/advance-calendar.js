import React, { useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import Dialog from './dialog';
import { format } from 'date-fns';

const Calendar = ({ data, tooltipOpt, ...props }) => {
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const currentDate = new Date();
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

    const [tooltipData, setTooltipData] = useState(null);
    const [dateDetail, setDateDetail] = useState(null);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const checkDate = (date1, date2) => {
        return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
    }

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const calendar = [];

        for (let i = 0; i < firstDay; i++) {
            calendar.push(<td key={`prev-${i}`} className="empty-cell"></td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dayData = data.filter((item) => {
                const itemDate = new Date(item.from ? item.from : item.datetime);
                return checkDate(itemDate, date);
            });

            calendar.push(dayData.length > 0 ?
                <td
                    key={day}
                    className={`${checkDate(date, currentDate) ? 'current-day' : ''} has-data`}
                    data-tooltip-id="tooltip"
                    onMouseEnter={() => {
                        setTooltipData(dayData);
                    }}
                    onMouseLeave={() => {
                        setTooltipData(null);
                    }}
                    onClick={() => {
                        if (tooltipData !== dayData)
                            setTooltipData(dayData);
                        setDateDetail(date);
                    }}
                >
                    {day}
                </td> : <td
                    key={day}
                    className={`${checkDate(date, currentDate) ? 'current-day' : ''}`}
                >
                    {day}
                </td>
            );
        }

        const lastDay = new Date(currentYear, currentMonth, daysInMonth).getDay();
        const remainingDays = 6 - lastDay;
        for (let i = 0; i < remainingDays; i++) {
            calendar.push(<td key={`next-${i}`} className="empty-cell"></td>);
        }

        const rows = [];
        let cells = [];
        calendar.forEach((cell, index) => {
            if (index % 7 === 0 && cells.length > 0) {
                rows.push(<tr key={rows.length}>{cells}</tr>);
                cells = [];
            }
            cells.push(cell);
        });
        rows.push(<tr key={rows.length}>{cells}</tr>);

        return rows;
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePrevYear = () => {
        setCurrentYear(currentYear - 1);
    };

    const handleNextYear = () => {
        setCurrentYear(currentYear + 1);
    };

    const onClose = () => {
        setDateDetail(false);
    }

    return (
        <>
            <table className="calendar-table">
                <thead>
                    <tr>
                        <th colSpan={7}>
                            <div className='date-handle'>
                                <div className='year'>
                                    <button type='button' onClick={handlePrevYear} className='previous'>
                                        <i className="fa-solid fa-chevron-left"></i>
                                        <i className="fa-solid fa-chevron-left"></i>
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                </div>
                                <div className='day'>
                                    <button type='button' onClick={handlePrevMonth} className='previous'>
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <span>{`${currentMonth + 1}/${currentYear}`}</span>
                                    <button type='button' onClick={handleNextMonth} className='next'>
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div className='year'>
                                    <button type='button' onClick={handleNextYear} className='next'>
                                        <i className="fa-solid fa-chevron-right"></i>
                                        <i className="fa-solid fa-chevron-right"></i>
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        {weekdays.map((weekday) => (
                            <th key={weekday}>{weekday}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
            </table>
            <Tooltip id="tooltip">
                {tooltipData && <TooltipOption tooltipOpt={tooltipOpt} data={tooltipData} />}
            </Tooltip>
            {dateDetail &&
                <ScheduleDetail data={tooltipData} onClose={onClose} date={dateDetail} {...props} />
            }
        </>
    );
};

const TooltipOption = ({ data, tooltipOpt }) => {
    const { component: Component } = tooltipOpt ? tooltipOpt : [];
    return (
        <>
            {Component ?
                <Component data={data} />
                : ''
            }
        </>
    )
}

const ScheduleDetail = ({ data, onClose, date, ...props }) => {
    const dialogDefault = useMemo(() => ({
        scheduleDetail: {
            title: "Thời khóa biểu",
            component: Dialog_Default
        }
    }), [])

    const { scheduleDetail } = props.dialog ? props.dialog : dialogDefault;

    return (
        <>
            <Dialog rowData={data} mode={scheduleDetail} onClose={onClose}>
                <div className='schedule-date'>
                    {format(date, 'dd/MM/yyyy')}
                </div>
            </Dialog>
        </>
    )
}

const Dialog_Default = ({ onClose }) => {
    return (
        <>
            <span>Chưa có Component cho dialog</span>
            <div className="dialog-button-tray">
                <button type="button" className="any-button button-cancel" onClick={onClose}>
                    Hủy bỏ
                </button>
            </div>
        </>
    )
}

export default Calendar;