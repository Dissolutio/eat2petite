import React from 'react'
import { format, isSameDay } from 'date-fns'

import DashboardCalendar from '../shared/DashboardCalendar'
import ChallengePost from './ChallengePost'
import { useUIContext } from '../../contexts/useUIContext'

const UserContestOverview = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
    const { userSelectedContest, me, posts, challenges } = props
    const { startDate, endDate } = userSelectedContest
    const currentChallenge = challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
    const postsArr = posts ? Object.values(posts) : []
    const daysWithInput = () => {
        return postsArr.map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
    }
    const daysWithoutInput = () => []
    const currentPost = () => {
        return postsArr
            .filter(post => post.contestId === userSelectedContest.uid)
            .find(post => isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)))
    }
    return (
        <>
            <ChallengePost
                selectedDateInDashboard={selectedDateInDashboard}
                userSelectedContest={userSelectedContest}
                contestStartDate={new Date(startDate)}
                contestEndDate={new Date(endDate)}
                currentPost={currentPost()}
                currentChallenge={currentChallenge}
                challenges={challenges}
                me={me}
            />
            <DashboardCalendar
                selectedDate={selectedDateInDashboard}
                setSelectedDateInDashboard={setSelectedDateInDashboard}
                minDate={new Date(startDate)}
                maxDate={new Date(endDate)}
                daysWithInput={daysWithInput()}
                daysWithoutInput={daysWithoutInput()}
            />
        </>
    )
}
export default UserContestOverview