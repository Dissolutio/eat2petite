import React from 'react'
import { Container } from 'reactstrap'
import { format, isSameDay } from 'date-fns'

import DashboardCalendar from '../shared/DashboardCalendar'
import CalendarHighlighter from '../shared/CalendarHighlighter'
import ChallengePost from './ChallengePost'
import { useUIContext } from '../../contexts/useUIContext'

const UserContestOverview = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
    const { userSelectedContest, me, posts, challenges } = props
    const { startDate, endDate } = userSelectedContest
    const currentChallenge = challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
    const postsArr = posts ? Object.values(posts) : []
    const daysWithInput = () => {
        return postsArr.filter(post => !!post.lastEditedAt)
            .map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
    }
    const daysWithTargetMet = () => {
        return postsArr.filter(post => !!post.lastEditedAt)
            .filter(post => (post.data.challenge1.quantityWaterDrank > post.targets.challenge1.quantityWaterDrank))
            .map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
    }
    const daysWithoutInput = () => {
        return postsArr.filter(post => !post.lastEditedAt)
            .map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
    }
    const currentPost = () => {
        return postsArr.filter(post => post.contestId === userSelectedContest.uid)
            .find(post => isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)))
    }
    return (
        <Container>
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
            <CalendarHighlighter
                daysWithInput={daysWithInput()}
                daysWithTargetMet={daysWithTargetMet()}
            >

                <DashboardCalendar
                    selectedDate={selectedDateInDashboard}
                    setSelectedDateInDashboard={setSelectedDateInDashboard}
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                />
            </CalendarHighlighter>
        </Container>
    )
}
export default UserContestOverview