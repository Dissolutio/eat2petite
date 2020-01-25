import React from 'react'
import { Container, Button } from 'reactstrap'
import { format, isSameDay } from 'date-fns'

import DashboardCalendar from '../shared/DashboardCalendar'
import UserDidCheckin from '../shared/UserDidCheckin'
import { ReactComponent as ArrowOutlineLeftZondicon } from '../../assets/arrow-outline-left.svg'

export default function AdminUserOverview(props) {
    const { user, userSelectedContest, selectedDateInDashboard, setViewingUserId,
        currentChallenge, userPosts, setSelectedDateInDashboard } = props
    const { startDate, endDate } = userSelectedContest
    if (!userSelectedContest) { return null }
    const postsForSelectedContest = () => {
        return userPosts && Object.values(userPosts).filter(post => post.contestId === userSelectedContest.uid)
    }
    const postForSelectedDate = () => {
        return postsForSelectedContest() && postsForSelectedContest().find(post => (
            isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard))
        ))
    }
    return (
        <>
            <Button style={{ backgroundColor: 'var(--E2P-ginger)' }} block onClick={() => setViewingUserId('')} >
                <ArrowOutlineLeftZondicon width="10%" style={{ padding: '0.2rem', fill: 'var(--font-light)', maxWidth: '40px', }} />
                <span>
                    Back to Contest
                </span>
            </Button>
            <Container className="border border-secondary rounded p-3 mt-2 mb-1 text-center">
                <h4 className='text-primary border-bottom border-primary'>
                    {`${user.firstName} ${user.lastName}`}
                </h4>
                <p className='text-secondary'>
                    {format(selectedDateInDashboard, 'P')}
                </p>
                <PostDetailForSelectedDate post={postForSelectedDate()} currentChallenge={currentChallenge} />
            </Container>
            <Container className='mb-3'>
                <DashboardCalendar
                    selectedDate={selectedDateInDashboard}
                    setSelectedDateInDashboard={setSelectedDateInDashboard}
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                />
            </Container>
        </>
    )
}
const PostDetailForSelectedDate = ({ post, currentChallenge }) => {
    const challengeId = currentChallenge.uid
    if (!post) {
        return <div>No Post Found</div>
    }
    if (challengeId === 'challenge1') {
        const { quantityWaterDrank, quantityWaterDrankUnits } = post.data.challenge1
        return (
            <div>
                <h5>{currentChallenge.challengeName}</h5>
                <UserDidCheckin checkInBonus={post.checkInBonus} />
                <p>
                    {`${quantityWaterDrank} ${quantityWaterDrankUnits}`}
                </p>
            </div>
        )
    }
    if (challengeId === 'challenge2') {
        const { servingsVegetablesEaten } = post.data[challengeId]
        return (
            <div>
                <h3>{post.contestId}</h3>
                <p>
                    {`${servingsVegetablesEaten} servings`}
                </p>
            </div>
        )
    }
    if (challengeId === 'challenge3') {
        const { proteinConsumed, proteinConsumedUnits } = post.data[challengeId]
        return (
            <div>
                <h5>{currentChallenge.challengeName}</h5>
                <p>
                    {`${proteinConsumed} ${proteinConsumedUnits}`}
                </p>
            </div>
        )
    }
    else return null
}