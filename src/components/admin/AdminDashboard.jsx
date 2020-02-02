import React from 'react'
import { format, isSameDay } from 'date-fns'
import { Container, Button } from 'reactstrap'

import { useRealtimeDataContext, useUIContext } from '../../contexts'
import { useKeepDateInContestRange } from '../../hooks'
import {
	DashboardCalendar,
	SelectContestDropdown,
	UserDidCheckin,
	UsersGrid
} from '../../components'
import { ReactComponent as ArrowOutlineLeftZondicon } from '../../assets/arrow-outline-left.svg'
import { sortByMostCurrentStartDate } from '../../helpers'

export default function AdminDashboard() {
	const { appData } = useRealtimeDataContext()
	const {
		challenges,
		contests,
		adminPosts,
		adminUsers,
	} = appData
	const {
		selectedDate,
		setSelectedDate,
		selectedContestId,
		setSelectedContestId,
		viewingUserId,
		setViewingUserId
	} = useUIContext()
	const contestsArray = contests && Object.values(contests)
	const selectedContest = contests && contests[selectedContestId]
	useKeepDateInContestRange(selectedContest, selectedDate, setSelectedDate)
	// Auto select a contest
	if (contestsArray && !selectedContest) {
		const sortedByStartDate = contestsArray.sort(sortByMostCurrentStartDate)
		const mostRecentlyStartedContest = sortedByStartDate[0]
		const contestId = mostRecentlyStartedContest.uid
		if (contestId) {
			setSelectedContestId(contestId)
		}
	}
	// Don't render until there IS a contest
	if (!selectedContest) {
		return (<p>No contests found!</p>)
	}
	// Get the challenge for the currently selected date
	const currentChallengeId = selectedContest.getChallengeForDate(selectedDate)
	const currentChallenge = challenges[currentChallengeId]
	const allPostsArray = adminPosts && Object.values(adminPosts)
	const postsForSelectedContest = allPostsArray && allPostsArray.filter(post => post.contestId === selectedContestId)
	const postsForSpecificUser = postsForSelectedContest && postsForSelectedContest[viewingUserId]
	const usersPostForSelectedDate = postsForSpecificUser && postsForSpecificUser.find(post => {
		return isSameDay(new Date(post.postDate), new Date(selectedDate))
	})
	const viewingUser = viewingUserId && adminUsers[viewingUserId]
	const enrolledUsers = selectedContest.enrolledUsers
	const enrolledUsersArray = enrolledUsers && adminUsers && Object.keys(enrolledUsers).map((userId) => {
		return adminUsers[userId]
	})
	return (
		<Container>
			<h3 className='text-center'>{selectedContest.title}</h3>
			<SelectContestDropdown
				contests={contestsArray}
				selectedContest={selectedContest}
				setSelectedContestId={setSelectedContestId}
			/>
			{viewingUserId ?
				(
					<Container>
						<Button style={{ backgroundColor: 'var(--E2P-ginger)' }} block onClick={() => setViewingUserId('')} >
							<ArrowOutlineLeftZondicon width="10%" style={{ padding: '0.2rem', fill: 'var(--font-light)', maxWidth: '40px', }} />
							<span>
								Back to Contest
							</span>
						</Button>
						<Container className="border border-secondary rounded p-3 mt-2 mb-1 text-center">
							<h4 className='text-primary border-bottom border-primary'>
								{`${viewingUser.firstName} ${viewingUser.lastName}`}
							</h4>
							<p className='text-secondary'>
								{format(selectedDate, 'P')}
							</p>
							<PostDetailForSelectedDate post={usersPostForSelectedDate} currentChallenge={currentChallenge} />
						</Container>
					</Container>
				)
				:
				(
					<Container className='rounded p-3 m-2 text-center'>
						<h4 style={{ fontFamily: 'ABeeZee' }}>
							{format(new Date(selectedDate), 'P')}
						</h4>
						<p className='text-secondary'>
							{(currentChallenge && currentChallenge.challengeName) ||
								'No Challenge'}
						</p>
						<UsersGrid
							usersPostForSelectedDate={usersPostForSelectedDate}
							setViewingUserId={setViewingUserId}
							enrolledUsersArray={enrolledUsersArray}
						/>
					</Container>
				)
			}
			<Container className='mb-3'>
				<DashboardCalendar
					selectedDate={selectedDate}
					setSelectedDateInDashboard={setSelectedDate}
					minDate={new Date(selectedContest.startDate)}
					maxDate={new Date(selectedContest.endDate)}
				/>
			</Container>
		</Container>
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