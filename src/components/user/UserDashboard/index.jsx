import React from 'react'
import { Container } from 'reactstrap'
import { eachDayOfInterval, addDays, isAfter } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'
import { useAuthUserContext } from '../../../contexts/useAuthUserContext'

import { UserDashboardCalendar } from './UserDashboardCalendar'
import UserContestsList from '../UserContestsList'

export const UserDashboard = () => {
    const { appData } = useDataContext()
    const { contests } = appData
    const { user } = useAuthUserContext()
    console.log('user', user)
    const userEnrolledContests = user.contests && Object.keys(user.contests).map(contestKey => {
        return contests[contestKey]
    })
    console.log('HERE', userEnrolledContests)
    const [userSelectedContest, setUserSelectedContest] = React.useState()
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    if (userSelectedContest) {
        const { startDate, daysPerChallenge, numberOfChallenges } = userSelectedContest
        const sortByMostCurrentStartDate = (a, b) => {
            if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
                return -1
            } else {
                return 1
            }
        }
        const sortedByMostRecent = [...userEnrolledContests.sort(sortByMostCurrentStartDate)]
        console.log(sortedByMostRecent)
        setUserSelectedContest(sortedByMostRecent[0])
        const contestLengthInDays = daysPerChallenge * numberOfChallenges
        const endDate = new Date(addDays(new Date(startDate), contestLengthInDays))
        const allContestDays = eachDayOfInterval({ start: startDate, end: endDate })
        console.log("CONTESTS", contests)
        return (
            <Container className="text-center">
                <h1 className="text-center">User Dashboard</h1>
                <hr />
                <UserContestsList contests={contests} />
                <Container>
                    <UserDashboardCalendar
                        startDate={startDate}
                        endDate={endDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </Container>
            </Container>
        )
    } else {
        return (<div>No contest selected</div>)
    }
}
