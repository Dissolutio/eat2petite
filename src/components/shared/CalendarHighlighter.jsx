import React from 'react'
import styled from 'styled-components'

const CalendarHighlighter = props => {
    const { daysWithInput, daysWithTargetMet, children } = props
    const progressDatesToCSS = () => {
        return daysWithInput && daysWithInput.reduce((result, date) => (
            result + `
                abbr[aria-label = "${date}"] {
                    border: 2px solid var(--E2P-orange);
                }
            `
        ), '')
    }
    const successDatesToCSS = () => {
        return daysWithTargetMet && daysWithTargetMet.reduce((result, date) => (
            result + `
                abbr[aria-label = "${date}"] {
                    border: 2px solid var(--E2P-ginger);
                }
            `
        ), '')
    }
    return (
        <HighlighterStyledDiv
            progressDatesToCSS={progressDatesToCSS}
            successDatesToCSS={successDatesToCSS}
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
        font-size: 10px;
        }
    ${props => props.progressDatesToCSS}
    ${props => props.successDatesToCSS}
    // active tile should still have unique color
    .react-calendar__tile--active > abbr {
        background-color: var(--app-bg) !important;
        color: var(--font-dark) !important;
        border: 3px solid var(--E2P-bright-orange) !important;
        box-shadow: 2, 2, var(--E2P-bright-orange) !important;
    }
`