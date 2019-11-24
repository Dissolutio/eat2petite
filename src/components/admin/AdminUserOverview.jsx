import React from 'react'
import { Container, Button } from 'reactstrap'
import { format, isSameDay } from 'date-fns'
import styled from 'styled-components'

import DashboardCalendar from '../shared/DashboardCalendar'

export default function AdminUserOverview(props) {
    const { user, userSelectedContest, selectedDateInDashboard, currentChallenge, challenges, userPosts, setSelectedDateInDashboard } = props
    const { startDate, endDate } = userSelectedContest
    if (!userSelectedContest) { return null }
    const postsForSelectedContest = () => {
        return userPosts && Object.values(userPosts)
            .filter(post => post.contestId === userSelectedContest.uid)
    }
    const postForSelectedDate = () => postsForSelectedContest.find(post => (
        isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard))
    ))
    return (
        <>
            <Container className="border border-secondary rounded p-3 mt-2 mb-1 text-center">
                <p className='text-secondary'>{format(selectedDateInDashboard, 'P')}</p>
                <PostsGrid >
                    {postsForSelectedContest().map(post => {
                        return (
                            <Button key={post.uid} color='info'>
                                <h6>{post && post.checkedInBonus ? `\u2605` : null}{`${post.postDate}`}</h6>
                            </Button>
                        )
                    }
                    )}
                </PostsGrid>
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
const PostsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 10px;
	grid-row-gap: 15px;
`
