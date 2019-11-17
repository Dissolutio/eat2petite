import React from 'react'
import { Container, Button } from 'reactstrap'
import { format, isSameDay } from 'date-fns'
import styled from 'styled-components'

import { useUIContext } from '../../contexts/useUIContext'
import DashboardCalendar from '../shared/DashboardCalendar'
import { AdminDevConsole } from '../shared/DevConsole'


const AdminContestOverview = (props) => {
    const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
    const { userSelectedContest, posts, challenges, users } = props
    const { startDate, endDate, enrolledUsers } = userSelectedContest
    if (!userSelectedContest) { return null }
    const enrolledUsersArray = enrolledUsers && Object.keys(enrolledUsers).map(userId => users[userId])
    const currentChallenge = challenges && challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
    function getPostForSelectedDateForUserId(userId) {
        if (!posts) { return }
        const allUsersPosts = posts[userId]
        return allUsersPosts && Object.values(allUsersPosts)
            .filter(post => post.contestId === userSelectedContest.uid)
            .find(post => (
                isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard))
            ))
    }
    const daysWithInput = [format(new Date(), 'MMMM d, yyyy'), 'November 10, 2019', 'November 11, 2019']
    const daysWithoutInput = ['November 14, 2019', 'November 13, 2019', 'November 15, 2019']
    return (
        <>
            <Container className="border border-secondary rounded p-3 mt-2 mb-1 text-center">
                {currentChallenge ? (
                    <h5 className='text-primary border-bottom border-primary'>{currentChallenge.challengeName}</h5>
                ) : (
                        <h5>No challenge for today!</h5>
                    )}
                <p className='text-secondary'>{format(selectedDateInDashboard, 'P')}</p>
                <UsersGrid >
                    {enrolledUsersArray && enrolledUsersArray.map(user => {
                        const post = getPostForSelectedDateForUserId(user.uid)
                        return (
                            <Button key={user.uid} color='info'>
                                <h6>{post && post.checkedInBonus ? `\u2605` : null}{user.username}</h6>
                            </Button>
                        )
                    }
                    )}
                </UsersGrid>
            </Container>
            <Container className='mb-3'>
                <DashboardCalendar
                    selectedDate={selectedDateInDashboard}
                    setSelectedDateInDashboard={setSelectedDateInDashboard}
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                    daysWithInput={daysWithInput}
                    daysWithoutInput={daysWithoutInput}
                />
            </Container>
            <AdminDevConsole></AdminDevConsole>
        </>
    )
}
const UsersGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 10px;
	grid-row-gap: 15px;
`
export default AdminContestOverview