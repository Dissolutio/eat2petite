import React from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import { format } from 'date-fns'

const DashboardCalendar = props => {
  const { minDate, maxDate, selectedDate, setSelectedDateInDashboard, progressHighlightDateArr, successHighlightDateArr } = props
  const dateChangeHandler = (date) => {
    setSelectedDateInDashboard(date)
  }
  const DateSquare = (props) => {
    // usage, put this as prop to Calendar:
    // tileContent={DateSquare}
    const { children, date } = props
    const formattedDate = format(new Date(date), 'MMMM d, yyyy')
    const isProgressDate = () => {
      return progressHighlightDateArr.includes(formattedDate)
    }
    return (
      <DateSquareStyle
        progress={isProgressDate()}
        progressHighlightDateArr={progressHighlightDateArr}
      >
        <span>{children}</span>
        <span>X</span>
      </DateSquareStyle>
    )
  }
  return (
    <RestyledCalendar
      progressHighlightDateArr={progressHighlightDateArr}
      successHighlightDateArr={successHighlightDateArr}
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
background-color: var(--app-bg);
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
// active tile should still have unique color
  .react-calendar__tile--active > abbr {
      background-color: var(--app-bg) !important;
      color: var(--font-dark) !important;
      border: 3px solid var(--E2P-bright-orange) !important;
      box-shadow: 2, 2, var(--E2P-bright-orange) !important;
  }
  button > abbr[aria-label] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 35% 0;
          color: inherit;
          }
button:disabled {
  background-color: var(--transparent-gray);
  color: var(--transparent-gray);
}
${props => props.progressHighlightDateArr && props.progressHighlightDateArr.reduce((result, date) => (
  result + `
          abbr[aria-label = "${date}"] {
              border: 3px solid var(--E2P-bright-orange);
          }
      `
), '')}
${props => props.successHighlightDateArr && props.successHighlightDateArr.reduce((result, date) => (
  result + `
          abbr[aria-label = "${date}"] {
              border: 2px solid var(--E2P-bright-orange);
              background-color: var(--E2P-bright-orange) !important;
          }
      `
), '')}
`
const DateSquareStyle = styled.div`
  color: red;
  width: 100%;
  height: 100%;
  ${props => props.progress ?
    `border: 2px solid green;`
    :
    null
  }
`