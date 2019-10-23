import React from 'react'
import Calendar from 'react-calendar'


export const UserDashboardCalendar = props => {
    const { startDate, endDate, selectedDate, setSelectedDate } = props
    const changeHandler = date => {
        setSelectedDate(date)
    }
    const today = new Date()
    return (
        <Calendar
            onChange={changeHandler}
            value={selectedDate}
            calendarType="US"
            minDate={startDate}
            maxDate={today}
            minDetail={'month'}
        />
    )
}
