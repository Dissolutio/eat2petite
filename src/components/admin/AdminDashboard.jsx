import React, { useState } from 'react'

import { useUIContext } from '../../contexts/useUIContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import AdminContestOverview from './AdminContestOverview'
import AdminUserOverview from './AdminUserOverview'

import { sortByMostCurrentStartDate } from '../../modules/functions'

export default function AdminDashboard(props) {
	const [userSelectedContest, setUserSelectedContest] = useState()
	const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
	const [viewingUserId, setViewingUserId] = React.useState('')
	const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
	const handleSelectedContestChange = (contest) => {
		setUserSelectedContest(contest)
		setLocalContestId(contest.uid)
	}
	const { contests, posts, challenges, users } = props
	const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
	const contestsArray = contests && Object.values(contests)

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
	const currentChallenge = challenges && challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
	return (
		<>
			{viewingUserId ?
				<AdminUserOverview
					user={users[viewingUserId]}
					userSelectedContest={userSelectedContest}
					setViewingUserId={setViewingUserId}
					selectedDateInDashboard={selectedDateInDashboard}
					setSelectedDateInDashboard={setSelectedDateInDashboard}
					currentChallenge={currentChallenge}
					challenges={challenges}
					userPosts={posts[viewingUserId]}
				/>
				:
				<AdminContestOverview
					userSelectedContest={userSelectedContest}
					handleSelectedContestChange={handleSelectedContestChange}
					selectedDateInDashboard={selectedDateInDashboard}
					setSelectedDateInDashboard={setSelectedDateInDashboard}
					setViewingUserId={setViewingUserId}
					currentChallenge={currentChallenge}
					users={users}
					posts={posts}
					contestsArray={contestsArray}
				/>
			}
		</>
	)
}