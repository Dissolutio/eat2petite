import React from 'react'
import { format, isSameDay, differenceInCalendarDays } from 'date-fns'

import UserDashboardCalendar from './UserDashboardCalendar'
import ChallengePost from './ChallengePost'
import { UserDevConsole } from '../../shared/DevConsole'

import { calculateContestData } from './utils'

const UserContestDashboard = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const { userSelectedContest, me, posts, challenges } = props
    const postsArray = posts &&
        Object.values(posts).filter(
            post => post.contestId === userSelectedContest.uid
        )
    const { contestStartDate, contestEndDate } = calculateContestData(userSelectedContest, postsArray)
    const currentPost = postsArray.find(post => isSameDay(new Date(post.postDate), new Date(selectedDate)))
    const currentChallenge = () => {
        const diffStartPost = differenceInCalendarDays(contestStartDate, selectedDate)
    }
    return (
        <>
            <UserDashboardCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                startDate={contestStartDate}
                contestEndDate={contestEndDate}
            />
            {process.env.NODE_ENV === 'development'
                ? <UserDevConsole userSelectedContest={userSelectedContest} />
                : null}
            <ChallengePost
                userSelectedContest={userSelectedContest}
                selectedDate={format(new Date(selectedDate), 'yyyy-MM-dd')}
                setSelectedDate={setSelectedDate}
                contestStartDate={contestStartDate}
                contestEndDate={contestEndDate}
                currentPost={currentPost}
                me={me}
            />
        </>
    )
}
export default UserContestDashboard