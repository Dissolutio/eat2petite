import React from 'react'
import Calendar from 'react-calendar'


const UserDashboardCalendar = props => {
  const { startDate, contestEndDate, selectedDate, dateChangeHandler } = props
  const changeHandler = date => dateChangeHandler(date)
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
export default UserDashboardCalendar
