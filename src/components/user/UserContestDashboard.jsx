import React from 'react'
import { isSameDay } from 'date-fns'

import UserDashboardCalendar from '../shared/DashboardCalendar'
import ChallengePost from './ChallengePost'
import { UserDevConsole } from '../shared/DevConsole'
import { useUIContext } from '../../contexts/useUIContext'

const UserContestDashboard = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
    const { userSelectedContest, me, posts, challenges } = props

    const { startDate, endDate } = userSelectedContest
    const currentChallenge = challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]

    const currentPost = getPostForSelectedDate()


    function getPostForSelectedDate() {
        if (!posts) { return }
        return Object.values(posts).filter(
            post => post.contestId === userSelectedContest.uid
        ).find(post => (
            isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)))
        )
    }
    const dateChangeHandler = (date) => {
        setSelectedDateInDashboard(date)
    }

    return (
        <>
            <ChallengePost
                selectedDate={selectedDateInDashboard}
                setSelectedDate={setSelectedDateInDashboard}
                userSelectedContest={userSelectedContest}
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
                minDate={new Date(startDate)}
                maxDate={new Date(endDate)}
            />
            {process.env.NODE_ENV === 'development'
                ? <UserDevConsole userSelectedContest={userSelectedContest} currentChallenge={currentChallenge} />
                : null}
        </>
    )
}
export default UserContestDashboard