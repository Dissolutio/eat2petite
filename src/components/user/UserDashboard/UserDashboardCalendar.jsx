import React from 'react'
import Calendar from 'react-calendar'


export const UserDashboardCalendar = props => {
    const { startDate, contestEndDate, selectedDate, setSelectedDate } = props
    const changeHandler = date => {
        setSelectedDate(date)
    }
    return (
        <Calendar
            onChange={changeHandler}
            value={selectedDate}
            calendarType="US"
            minDate={startDate}
            maxDate={contestEndDate}
            minDetail={'month'}
        />
    )
}
