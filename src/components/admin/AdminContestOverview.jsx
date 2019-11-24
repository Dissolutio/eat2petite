import React from 'react'
import { Container, Button } from 'reactstrap'
import { format, isSameDay } from 'date-fns'
import styled from 'styled-components'

import DashboardCalendar from '../shared/DashboardCalendar'
import SelectContestDropdown from '../shared/SelectContestDropdown'
import { AdminDevConsole } from '../shared/DevConsole'
import { lastInitial } from '../../modules/functions'

const AdminContestOverview = (props) => {
    const {
        userSelectedContest,
        handleSelectedContestChange,
        selectedDateInDashboard,
        setSelectedDateInDashboard,
        setViewingUserId,
        posts,
        currentChallenge,
        users,
        contestsArray
    } = props
    const { startDate, endDate, enrolledUsers } = userSelectedContest

    if (!userSelectedContest) { return null }
    function getPostForSelectedDateForUserId(userId) {
        if (!posts) { return }
        const allUsersPosts = posts[userId]
        return allUsersPosts && Object.values(allUsersPosts)
            .filter(post => post.contestId === userSelectedContest.uid)
            .find(post => (
                isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard))
            ))
    }
    const enrolledUsersArray = enrolledUsers && Object.keys(enrolledUsers).map(userId => users[userId])
    return (
        <>
            <SelectContestDropdown
                contests={contestsArray}
                userSelectedContest={userSelectedContest}
                handleSelectedContestChange={handleSelectedContestChange}
            />
            <Container className="border border-secondary rounded p-3 mt-2 mb-1 text-center">
                <h4 className='text-primary border-bottom border-primary'>{(currentChallenge && currentChallenge.challengeName) || 'No Challenge'}</h4>
                <p className='text-secondary'>{format(selectedDateInDashboard, 'P')}</p>
                <UsersGrid
                    getPostForSelectedDateForUserId={getPostForSelectedDateForUserId}
                    setViewingUserId={setViewingUserId}
                    enrolledUsersArray={enrolledUsersArray}
                />
            </Container>
            <Container className='mb-3'>
                <DashboardCalendar
                    selectedDate={selectedDateInDashboard}
                    setSelectedDateInDashboard={setSelectedDateInDashboard}
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                />
            </Container>
            {(process.env.NODE_ENV === 'development') ? <AdminDevConsole></AdminDevConsole> : null}
        </>
    )
}
const UserFullName = ({ user }) => {
    return (
        `${user.firstName} ${lastInitial(user.lastName)}`
    )
}
const UsersGrid = ({ enrolledUsersArray, getPostForSelectedDateForUserId, setViewingUserId }) => {
    const StarForCheckinBonus = ({ post }) => {
        return post && post.checkedInBonus ? `\u2605` : null
    }
    return (
        <UsersGridStyle>
            {enrolledUsersArray && enrolledUsersArray.map(user => {
                const post = getPostForSelectedDateForUserId(user.uid)
                return (
                    <Button
                        key={user.uid}
                        style={{ backgroundColor: 'var(--E2P-orange)' }}
                        onClick={() => setViewingUserId(user.uid)}>
                        <h6>
                            <StarForCheckinBonus post={post} />
                            <UserFullName user={user} />
                        </h6>
                    </Button>
                )
            }
            )}
        </UsersGridStyle>
    )
}
const UsersGridStyle = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 10px;
	grid-row-gap: 15px;
`
export default AdminContestOverview