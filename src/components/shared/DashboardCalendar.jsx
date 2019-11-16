import React from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'

const DashboardCalendar = props => {
  const { minDate, maxDate, selectedDate, setSelectedDateInDashboard, daysWithInput, daysWithoutInput } = props
  const dateChangeHandler = (date) => {
    setSelectedDateInDashboard(date)
  }
  const highlightCSS = () => {
    return daysWithInput.reduce((result, date) => (
      result + `abbr[aria-label = "${date}"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 35% 0;
      background-color: var(--E2P-orange);
      color: inherit;
      border: 1px solid green;
    }`
    ), '')
  }
  return (
    <Highlighter
      highlightCSS={highlightCSS}
      daysWithoutInput={daysWithoutInput}
    >
      <RestyledCalendar
        onChange={dateChangeHandler}
        value={selectedDate}
        calendarType="US"
        minDate={minDate}
        maxDate={maxDate}
        minDetail={'month'}
        tileClassName={'relative-position-tiles'}
      />
    </Highlighter>
  )
}
export default DashboardCalendar

const RestyledCalendar = styled(Calendar)`
.react-calendar__month-view__days__day--weekend {
  color: inherit;
}
.react-calendar__month-view__days__day--neighboringMonth {
  color: inherit;
}
button:disabled {
  background-color: var(--gray4);
  color: var(--gray4);
}
`
const Highlighter = styled.div`
  .relative-position-tiles {
  position: relative;
  }
${props => props.highlightCSS}
  // selected tile should still have unique color
  .react-calendar__tile--active > abbr {
    background-color: inherit !important;
  }
`