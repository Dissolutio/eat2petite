import React from 'react'
import styled from 'styled-components'

const CalendarHighlighter = props => {
    const { daysWithInput, daysWithoutInput, daysWithTargetMet, children } = props
    const blueDatesCSS = () => {
        return daysWithInput && daysWithInput.reduce((result, date) => (
            result + `abbr[aria-label = "${date}"] {
    background-color: #33b5e5;
    }`
        ), '')
    }
    const grayDatesCSS = () => {
        return daysWithoutInput && daysWithoutInput.reduce((result, date) => (
            result + `abbr[aria-label = "${date}"] {
    background-color: var(--light-gray);
    }`
        ), '')
    }
    const greenDatesCSS = () => {
        return daysWithTargetMet && daysWithTargetMet.reduce((result, date) => (
            result + `abbr[aria-label = "${date}"] {
    background-color: #00C851;
    }`
        ), '')
    }
    return (
        <HighlighterStyledDiv
            blueDatesCSS={blueDatesCSS}
            grayDatesCSS={grayDatesCSS}
            greenDatesCSS={greenDatesCSS}
        >
            {children}
        </HighlighterStyledDiv>
    )
}
export default CalendarHighlighter

const HighlighterStyledDiv = styled.div`
    button > abbr[aria-label] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 35% 0;
        color: inherit;
        }
    ${props => props.grayDatesCSS}
    ${props => props.blueDatesCSS}
    ${props => props.greenDatesCSS}
    // active tile should still have unique color
    .react-calendar__tile--active > abbr {
        background-color: inherit !important;
    }
`