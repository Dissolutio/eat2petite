import React, { useState } from 'react'
import { isSameDay, differenceInCalendarDays, isWithinInterval } from 'date-fns'

import UserDashboardCalendar from './UserDashboardCalendar'
import ChallengePost from './ChallengePost'
import { UserDevConsole } from '../../shared/DevConsole'
import { useUIContext } from '../../../contexts/useUIContext'

const UserContestDashboard = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
    const [formDisabled, setFormDisabled] = useState(false)
    const { userSelectedContest, me, posts, challenges } = props
    const postsArray = posts &&
        Object.values(posts).filter(
            post => post.contestId === userSelectedContest.uid
        )
    const { startDate, endDate, orderOfChallenges, daysPerChallenge } = userSelectedContest
    const currentPost = postsArray && postsArray.find(post => isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)))
    const getChallengeUidForDate = (date) => {
        const contestDay = differenceInCalendarDays(selectedDateInDashboard, new Date(startDate))
        const orderOfChallengesIndex = Math.floor(contestDay / daysPerChallenge)
        return orderOfChallenges[orderOfChallengesIndex]
    }
    const currentChallenge = challenges[getChallengeUidForDate(selectedDateInDashboard)]
    const dateChangeHandler = (date) => {
        const isBetweenStartAndToday = isWithinInterval(date, {
            start: new Date(startDate),
            end: new Date(),
        })
        if (!isBetweenStartAndToday) {
            setFormDisabled(true)
        }
        if (isBetweenStartAndToday) {
            setFormDisabled(false)
        }
        setSelectedDateInDashboard(date)
    }

    return (
        <>
            <ChallengePost
                selectedDate={selectedDateInDashboard}
                setSelectedDate={setSelectedDateInDashboard}
                userSelectedContest={userSelectedContest}
                formDisabled={formDisabled}
                contestStartDate={new Date(startDate)}
                contestEndDate={new Date(endDate)}
                currentPost={currentPost}
                currentChallenge={currentChallenge}
                challenges={challenges}
                me={me}
            />
            <UserDashboardCalendar
                selectedDate={selectedDateInDashboard}
                dateChangeHandler={dateChangeHandler}
                contestStartDate={new Date(startDate)}
                contestEndDate={new Date(endDate)}
            />
            {process.env.NODE_ENV === 'development'
                ? <UserDevConsole userSelectedContest={userSelectedContest} currentChallenge={currentChallenge} />
                : null}
        </>
    )
}
export default UserContestDashboard