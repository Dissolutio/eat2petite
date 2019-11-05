import React from 'react'
import Calendar from 'react-calendar'


const UserDashboardCalendar = props => {
  const { minDate, maxDate, selectedDate, dateChangeHandler } = props
  return (
    <Calendar
      onChange={dateChangeHandler}
      value={selectedDate}
      calendarType="US"
      minDate={minDate}
      maxDate={maxDate}
      minDetail={'month'}
    />
  )
}
export default UserDashboardCalendar
