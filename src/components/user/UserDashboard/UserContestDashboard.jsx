import React, { useState } from 'react'
import { format, isSameDay, differenceInCalendarDays, addDays, isWithinInterval } from 'date-fns'

import UserDashboardCalendar from './UserDashboardCalendar'
import ChallengePost from './ChallengePost'
import { UserDevConsole } from '../../shared/DevConsole'

import { calculateContestData } from './utils'

const UserContestDashboard = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const [formError, setFormError] = useState('')
    const { userSelectedContest, me, posts, challenges } = props
    const postsArray = posts &&
        Object.values(posts).filter(
            post => post.contestId === userSelectedContest.uid
        )
    const { contestStartDate, contestEndDate } = calculateContestData(userSelectedContest, postsArray)
    const currentPost = postsArray && postsArray.find(post => isSameDay(new Date(post.postDate), new Date(selectedDate)))
    console.log("TCL: UserContestDashboard -> currentPost", currentPost)
    const currentChallenge = () => {
        const diffStartPost = differenceInCalendarDays(contestStartDate, selectedDate)
    }
    const dateFormOnChange = (event) => {
        // add one day, because the  reactstrap Input value seems to round down a day, for some reason
        const newDate = addDays(new Date(event.target.value), 1)
        dateChangeHandler(newDate)
    }
    const dateChangeHandler = (date) => {
        const formattedNewDate = format(new Date(date), 'P')
        const isBetweenStartAndToday = isWithinInterval(date, {
            start: contestStartDate,
            end: new Date(),
        })
        if (!isBetweenStartAndToday) {
            setFormError(`You selected: ${formattedNewDate}. Please choose a date between the contest start day and today.`)
            setTimeout(() => {
                setFormError('')
            }, 5000);
        }
        if (isBetweenStartAndToday) {
            setSelectedDate(date)
            setFormError(``)
        }
    }

    return (
        <>
            <UserDashboardCalendar
                selectedDate={selectedDate}
                dateChangeHandler={dateChangeHandler}
                startDate={contestStartDate}
                contestEndDate={contestEndDate}
            />
            {process.env.NODE_ENV === 'development'
                ? <UserDevConsole userSelectedContest={userSelectedContest} />
                : null}
            <ChallengePost
                userSelectedContest={userSelectedContest}
                selectedDate={format(new Date(selectedDate), 'yyyy-MM-dd')}
                dateChangeHandler={dateFormOnChange}
                formError={formError}
                contestStartDate={contestStartDate}
                contestEndDate={contestEndDate}
                currentPost={currentPost}
                me={me}
            />
        </>
    )
}
export default UserContestDashboard