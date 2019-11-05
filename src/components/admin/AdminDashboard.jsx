import React, { useState } from 'react'
import { Container, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import queryString from 'query-string'
import { format, isSameDay, differenceInCalendarDays, isWithinInterval } from 'date-fns'
import styled from 'styled-components'
import { useDataContext } from '../../contexts/useDataContext'
import { AdminDevConsole } from '../shared/DevConsole'
import AdminSelectContestDropdown from './AdminSelectContestDropdown'
import { useUIContext } from '../../contexts/useUIContext'
import { sortByMostCurrentStartDate } from '../../modules/functions'
import AdminDashboardUserPostCard from './AdminDashboardUserPostCard'
import UserDashboardCalendar from '../shared/DashboardCalendar'

export default function AdminDashboard(props) {
	const [userSelectedContest, setUserSelectedContest] = useState()
	const [hasInitialized, setHasInitialized] = useState(false)

	const { appData } = useDataContext()
	const { contests, posts, me, challenges, users } = appData
	const queryParams = queryString.parse(props.location.search)
	const contestsArray = Object.values(contests)
	const sortedByMostRecent = [...contestsArray.sort(sortByMostCurrentStartDate)]
	const autoSelectedContest = sortedByMostRecent[0]
	const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
	if (!hasInitialized && contestsArray) {
		if (queryContest) {
			setUserSelectedContest(queryContest)
			setHasInitialized(true)
		} else if (autoSelectedContest) {
			setUserSelectedContest(autoSelectedContest)
			setHasInitialized(true)
		}
	}

	if (userSelectedContest) {
		return (
			<Container>
				<AdminSelectContestDropdown contests={contestsArray} userSelectedContest={userSelectedContest} />
				<ContestOverview userSelectedContest={userSelectedContest} users={users} challenges={challenges} posts={posts} />
			</Container>
		)
	}
	return null
}
const ContestOverview = (props) => {
	const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
	const { userSelectedContest, posts, challenges, users } = props

	const { startDate, endDate, enrolledUsers } = userSelectedContest
	const enrolledUsersArray = enrolledUsers && Object.keys(enrolledUsers).map(userId => users[userId])
	const currentChallenge = challenges && challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
	function getPostForSelectedDateForUserId(userId) {
		const allUsersPosts = posts[userId]
		if (allUsersPosts) {
			const answer = Object.values(allUsersPosts)
				.filter(post => post.contestId === userSelectedContest.uid)
				.find(post => (
					isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard))
				))
			return answer
		}
		return undefined
	}
	const dateChangeHandler = (date) => {
		setSelectedDateInDashboard(date)
	}
	return (
		<>
			<Container className="border border-primary rounded p-4 mt-4 mb-3 text-center">
				<h5 className='text-primary border-bottom border-primary'>{currentChallenge.challengeName}</h5>
				<p className='text-secondary'>{format(selectedDateInDashboard, 'P')}</p>
				{enrolledUsersArray && enrolledUsersArray.map(user => {
					console.log("TCL: ContestOverview -> user", user)
					const post = getPostForSelectedDateForUserId(user.uid)
					console.log("TCL: ContestOverview -> post", post)
					return (
						<AdminDashboardUserPostCard key={user.uid} post={post} user={user} />
					)
				}
				)}
			</Container>
			<Container className='mb-3'>

				<UserDashboardCalendar
					selectedDate={selectedDateInDashboard}
					dateChangeHandler={dateChangeHandler}
					minDate={new Date(startDate)}
					maxDate={new Date(endDate)}
				/>
			</Container>
		</>
	)
}
