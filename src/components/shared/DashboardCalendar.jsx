import React from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'

const DashboardCalendar = props => {
  const { minDate, maxDate, selectedDate, setSelectedDateInDashboard } = props
  const dateChangeHandler = (date) => {
    setSelectedDateInDashboard(date)
  }
  return (
    <RestyledCalendar
      onChange={dateChangeHandler}
      value={selectedDate}
      calendarType="US"
      minDate={minDate}
      maxDate={maxDate}
      minDetail={'month'}
      tileClassName={'relative-position-tiles'}
    />
  )
}

export default DashboardCalendar

const RestyledCalendar = styled(Calendar)`
margin: 0 auto; 
/* override red weekend numbers */
.react-calendar__month-view__days__day--weekend {
  color: inherit;
}
.react-calendar__month-view__days__day--neighboringMonth {
  color: inherit;
}
.relative-position-tiles {
  position: relative;
  min-height: 52px;
}
button:disabled {
  background-color: var(--transparent-gray);
  color: var(--transparent-gray);
}
`