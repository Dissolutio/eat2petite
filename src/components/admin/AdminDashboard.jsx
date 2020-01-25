import React, { useState } from 'react'
import { isAfter } from 'date-fns'

import { useRealtimeDataContext } from '../../contexts'
import { useLocalStorage } from '../../hooks'
import { AdminContestOverview, AdminUserOverview } from '../../components'
import { sortByMostCurrentStartDate } from '../../helpers'

export default function AdminDashboard() {

	const [userSelectedContest, setUserSelectedContest] = useState()
	const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
	const [selectedDateInDashboard, setSelectedDateInDashboard] = useState(new Date())
	const [viewingUserId, setViewingUserId] = React.useState('')
	const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')

	const { appData } = useRealtimeDataContext()
	const { contests, challenges } = appData
	const users = appData.adminUsers
	const posts = appData.adminPosts
	const contestsArray = contests && Object.values(contests)

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
	// Don't render until there IS a contest
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