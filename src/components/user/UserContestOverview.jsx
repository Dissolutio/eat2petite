import React from 'react'
import { Container } from 'reactstrap'
import { format, isSameDay } from 'date-fns'

import DashboardCalendar from '../shared/DashboardCalendar'
import ChallengePost from './post/ChallengePost'

const UserContestOverview = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard, userSelectedContest, me, posts, challenges, currentChallenge } = props
    const { startDate, endDate } = userSelectedContest
    const postsArr = posts ? Object.values(posts) : []
    const currentPost = () => {
        return postsArr.filter(post => post.contestId === userSelectedContest.uid)
            .find(post => isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)))
    }
    function daysWithInput() {
        return postsArr && postsArr.filter(post => !!post.lastEditedAt)
            .map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
    }
    const daysWithTargetMet = () => {
        return postsArr && postsArr.filter(post => post && post.targetsMet)
            .map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
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
            <DashboardCalendar
                selectedDate={selectedDateInDashboard}
                setSelectedDateInDashboard={setSelectedDateInDashboard}
                minDate={new Date(startDate)}
                maxDate={new Date(endDate)}
                daysWithInput={daysWithInput()}
                daysWithTargetMet={daysWithTargetMet()}
            />
        </Container>
    )
}
export default UserContestOverview