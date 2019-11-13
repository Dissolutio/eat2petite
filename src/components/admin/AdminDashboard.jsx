import React, { useState } from 'react'
import { Container, Button } from 'reactstrap'
import queryString from 'query-string'
import { format, isSameDay } from 'date-fns'
import styled from 'styled-components'

import { useDataContext } from '../../contexts/useDataContext'
import AdminSelectContestDropdown from './AdminSelectContestDropdown'
import { useUIContext } from '../../contexts/useUIContext'
import { sortByMostCurrentStartDate } from '../../modules/functions'
import DashboardCalendar from '../shared/DashboardCalendar'
import { AdminDevConsole } from '../shared/DevConsole'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'
export default function AdminDashboard(props) {
	const [userSelectedContest, setUserSelectedContest] = useState()
	const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
	console.log("TCL: AdminDashboard -> localContestId", localContestId)
	const [hasLoadedContest, setHasLoadedContest] = useState(false)
	const { appData } = useDataContext()
	const { contests, posts, challenges, users } = appData
	const queryParams = queryString.parse(props.location.search)
	const contestsArray = Object.values(contests)
	const sortedByMostRecent = [...contestsArray.sort(sortByMostCurrentStartDate)]
	const autoSelectedContest = sortedByMostRecent[0]
	const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
	const handleSelectedContestChange = (contest) => {
		setUserSelectedContest(contest)
		setLocalContestId(contest.uid)
	}
	if (!hasLoadedContest && contestsArray) {
		if (queryContest) {
			handleSelectedContestChange(queryContest)
			setHasLoadedContest(true)
		} else if (contests[localContestId]) {
			setUserSelectedContest(contests[localContestId])
			setHasLoadedContest(true)
		} else if (autoSelectedContest) {
			handleSelectedContestChange(autoSelectedContest)
			setHasLoadedContest(true)
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
	const dateChangeHandler = (date) => {
		setSelectedDateInDashboard(date)
	}
	const arrayOfFormattedDatesToHighlight = [format(new Date(), 'MMMM d, yyyy'), 'November 10, 2019', 'November 11, 2019']
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
					dateChangeHandler={dateChangeHandler}
					minDate={new Date(startDate)}
					maxDate={new Date(endDate)}
					arrayOfFormattedDatesToHighlight={arrayOfFormattedDatesToHighlight}
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