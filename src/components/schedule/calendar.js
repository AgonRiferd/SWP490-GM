import React, { useState } from 'react';

const Calendar = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const calendar = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(<td key={`prev-${i}`} className="empty-cell"></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(<td key={day} >{day}</td>);
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

  return (
    <>
      <table className="calendar-table">
        <thead>
          <tr>
            <th colSpan={7}>
              <button onClick={handlePrevYear}>Previous Year</button>
              <button onClick={handlePrevMonth}>Previous Month</button>
              <span>{`${currentMonth + 1}/${currentYear}`}</span>
              <button onClick={handleNextMonth}>Next Month</button>
              <button onClick={handleNextYear}>Next Year</button>
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
    </>
  );
};

export default Calendar;