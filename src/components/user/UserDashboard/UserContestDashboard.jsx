import React, { useState } from 'react'
import { format, isSameDay, differenceInCalendarDays, addDays, isWithinInterval } from 'date-fns'

import UserDashboardCalendar from './UserDashboardCalendar'
import ChallengePost from './ChallengePost'
import { UserDevConsole } from '../../shared/DevConsole'

import { calculateContestData } from './utils'

const UserContestDashboard = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const [formDisabled, setFormDisabled] = useState(false)
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
        const newDate = format(addDays(new Date(event.target.value), 1), 'P')
        dateChangeHandler(newDate)
    }
    const dateChangeHandler = (date) => {
        const isBetweenStartAndToday = isWithinInterval(date, {
            start: contestStartDate,
            end: new Date(),
        })
        if (!isBetweenStartAndToday) {
            setFormDisabled(true)
        }
        if (isBetweenStartAndToday) {
            setFormDisabled(false)
        }
        setSelectedDate(date)
    }

    return (
        <>
            <ChallengePost
                userSelectedContest={userSelectedContest}
                selectedDate={format(new Date(selectedDate), 'yyyy-MM-dd')}
                dateChangeHandler={dateFormOnChange}
                formDisabled={formDisabled}
                contestStartDate={contestStartDate}
                contestEndDate={contestEndDate}
                currentPost={currentPost}
                me={me}
            />
            <UserDashboardCalendar
                selectedDate={selectedDate}
                dateChangeHandler={dateChangeHandler}
                startDate={contestStartDate}
                contestEndDate={contestEndDate}
            />
            {process.env.NODE_ENV === 'development'
                ? <UserDevConsole userSelectedContest={userSelectedContest} />
                : null}
        </>
    )
}
export default UserContestDashboard