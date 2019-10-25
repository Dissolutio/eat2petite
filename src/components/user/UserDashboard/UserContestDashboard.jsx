import React from 'react'
import { format } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'
import { UserDashboardCalendar } from './UserDashboardCalendar'
import WaterChallengePostForm from '../WaterChallengePostForm'
import { UserDevConsole } from '../../shared/DevConsole'

import { calculateContestData } from './utils'

const UserContestDashboard = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const { appData, createUserPost, loadFirebaseData } = useDataContext()
    const { posts, me } = appData
    const { userSelectedContest } = props
    const postsArray = posts &&
        Object.values(posts).filter(
            post => post.contestId === userSelectedContest.uid
        )
    const { contestStartDate, contestEndDate, datePostObjects } = calculateContestData(userSelectedContest, postsArray)
    console.log("TCL: UserContestDashboard -> datePostObjects", datePostObjects)

    return (
        <>
            <UserDashboardCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                startDate={contestStartDate}
                contestEndDate={contestEndDate}
            />
            <UserDevConsole userSelectedContest={userSelectedContest} />
            <WaterChallengePostForm
                userSelectedContest={userSelectedContest}
                selectedDate={format(new Date(selectedDate), 'yyyy-MM-dd')}
                setSelectedDate={setSelectedDate}
                contestStartDate={contestStartDate}
                contestEndDate={contestEndDate}
            />
        </>
    )
}
export default UserContestDashboard