import React, { useState } from 'react'
import { isSameDay, differenceInCalendarDays, isWithinInterval } from 'date-fns'

import UserDashboardCalendar from './UserDashboardCalendar'
import ChallengePost from './ChallengePost'
import { UserDevConsole } from '../../shared/DevConsole'
import { useUIContext } from '../../../contexts/useUIContext'

const UserContestDashboard = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
    const [selectedDateIsInFuture, setSelectedDateIsInFuture] = useState(false)
    const { userSelectedContest, me, posts, challenges } = props

    const { startDate, endDate, orderOfChallenges, daysPerChallenge } = userSelectedContest
    const currentChallenge = getChallengeForSelectedDate()
    const currentPost = getPostForSelectedDate()


    function getPostForSelectedDate() {
        if (!posts) { return }
        return Object.values(posts).filter(
            post => post.contestId === userSelectedContest.uid
        ).find(post => (
            isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)))
        )
    }
    function getChallengeForSelectedDate() {
        const contestDay = differenceInCalendarDays(selectedDateInDashboard, new Date(startDate))
        const orderOfChallengesIndex = Math.floor(contestDay / daysPerChallenge)
        return challenges[orderOfChallenges[orderOfChallengesIndex]]
    }
    const dateChangeHandler = (date) => {
        const isBetweenStartAndToday = isWithinInterval(date, {
            start: new Date(startDate),
            end: new Date(),
        })
        if (!isBetweenStartAndToday) {
            setSelectedDateIsInFuture(true)
        }
        if (isBetweenStartAndToday) {
            setSelectedDateIsInFuture(false)
        }
        setSelectedDateInDashboard(date)
    }

    return (
        <>
            <ChallengePost
                selectedDate={selectedDateInDashboard}
                setSelectedDate={setSelectedDateInDashboard}
                userSelectedContest={userSelectedContest}
                formDisabled={selectedDateIsInFuture}
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