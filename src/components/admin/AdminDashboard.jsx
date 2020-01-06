import React, { useState } from 'react'
import { isAfter } from 'date-fns'
import { useUIContext } from '../../contexts/useUIContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import AdminContestOverview from './AdminContestOverview'
import AdminUserOverview from './AdminUserOverview'

import { sortByMostCurrentStartDate } from '../../modules/functions'

export default function AdminDashboard(props) {
	const [userSelectedContest, setUserSelectedContest] = useState()
	const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
	const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
	const [viewingUserId, setViewingUserId] = React.useState('')
	const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
	// When user switches contest, we adjust the selected date to be within the contest dates
	React.useEffect(() => {
		if (!userSelectedContest) { return }
		const selectedDateIsAfterContestEnd = isAfter(selectedDateInDashboard, new Date(userSelectedContest.endDate))
		const selectedDateIsBeforeContestStart = isAfter(new Date(userSelectedContest.startDate), selectedDateInDashboard)
		if (selectedDateIsAfterContestEnd) {
			setSelectedDateInDashboard(new Date(userSelectedContest.endDate))
		}
		if (selectedDateIsBeforeContestStart) {
			setSelectedDateInDashboard(new Date(userSelectedContest.startDate))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSelectedContest])

	const handleSelectedContestChange = (contest) => {
		setUserSelectedContest(contest)
		setLocalContestId(contest.uid)
	}
	const { contests, posts, challenges, users } = props
	const contestsArray = contests && Object.values(contests)
	// Auto select a contest
	if (!hasAutoSelectedContest && contestsArray) {
		const localContest = contests[localContestId]
		const mostRecentlyStartedContest = [...contestsArray.sort(sortByMostCurrentStartDate)][0]
		if (localContest) {
			setUserSelectedContest(localContest)
			setHasAutoSelectedContest(true)
		} else if (mostRecentlyStartedContest) {
			handleSelectedContestChange(mostRecentlyStartedContest)
			setHasAutoSelectedContest(true)
		}
	}
	if (!userSelectedContest) {
		return (<p>No contests found!</p>)
	}
	const currentChallenge = () => {
		const challengeForDay = challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
		if (challenges && challengeForDay) {
			return challengeForDay
		}
	}
	const userPosts = () => (posts && posts[viewingUserId]) ? posts[viewingUserId] : []

	return (
		<>
			{viewingUserId ?
				<AdminUserOverview
					user={users[viewingUserId]}
					userSelectedContest={userSelectedContest}
					setViewingUserId={setViewingUserId}
					selectedDateInDashboard={selectedDateInDashboard}
					setSelectedDateInDashboard={setSelectedDateInDashboard}
					currentChallenge={currentChallenge()}
					challenges={challenges}
					userPosts={userPosts()}
				/>
				:
				<AdminContestOverview
					userSelectedContest={userSelectedContest}
					handleSelectedContestChange={handleSelectedContestChange}
					selectedDateInDashboard={selectedDateInDashboard}
					setSelectedDateInDashboard={setSelectedDateInDashboard}
					setViewingUserId={setViewingUserId}
					currentChallenge={currentChallenge()}
					users={users}
					posts={posts}
					contestsArray={contestsArray}
				/>
			}
		</>
	)
}