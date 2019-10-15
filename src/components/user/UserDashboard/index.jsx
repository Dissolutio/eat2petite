import React from 'react'
import { Container } from 'reactstrap'
import { eachDayOfInterval, addDays, isAfter } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'
import { useAuthUserContext } from '../../../contexts/useAuthUserContext'

import { UserDashboardCalendar } from './UserDashboardCalendar'
import UserContestsList from '../UserContestsList'

function sortByMostCurrentStartDate(a, b) {
    if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
        return -1
    } else {
        return 1
    }
}
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
    const [hasFiredAutoSelect, setHasFiredAutoSelect] = React.useState(false)

    const sortedByMostRecent = [...userEnrolledContests.sort(sortByMostCurrentStartDate)]
    const autoSelectedContest = userEnrolledContests && sortedByMostRecent[0]
    console.log('autoSelectedContest', autoSelectedContest)
    console.log('userEnrolledContests', userEnrolledContests)
    if (autoSelectedContest && hasFiredAutoSelect === false) {
        console.log("FIRE AUTOSELECT")
        setHasFiredAutoSelect(true)
        setUserSelectedContest(autoSelectedContest)
    }

    if (userSelectedContest) {
        const { daysPerChallenge, numberOfChallenges } = userSelectedContest
        const contestLengthInDays = daysPerChallenge * numberOfChallenges
        const startDate = new Date(userSelectedContest.startDate)
        const endDate = new Date(addDays(startDate, contestLengthInDays))
        console.log("startDate", startDate)
        console.log("endDate", endDate)
        // const allContestDays = eachDayOfInterval({ start: startDate, end: endDate })
        console.log("CONTESTS", contests)
        return (
            <Container>
                {userSelectedContest.startDate && <UserDashboardCalendar
                    startDate={startDate}
                    endDate={endDate}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />}
            </Container>
        )
    }
    return (
        <Container className="text-center">
            <h1 className="text-center">User Dashboard</h1>
            <hr />
            <UserContestsList contests={contests} />
        </Container>
    )
}