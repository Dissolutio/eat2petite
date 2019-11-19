import React, { useState } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'

import { useUIContext } from '../../contexts/useUIContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'
import { sortByMostCurrentStartDate } from '../../modules/functions'

import AdminContestOverview from './AdminContestOverview'
import AdminUserOverview from './AdminUserOverview'
import AdminSelectContestDropdown from './AdminSelectContestDropdown'

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
	const queryParams = queryString.parse(props.location.search)
	const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
	if (queryContest && queryParams.selectedContest !== localContestId) {
		handleSelectedContestChange(queryContest)
		setHasAutoSelectedContest(true)
	}

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
		<Container>
			<AdminSelectContestDropdown
				contests={contestsArray}
				userSelectedContest={userSelectedContest}
			/>
			{viewingUserId ?
				<AdminUserOverview
					user={users[viewingUserId]}
					userSelectedContest={userSelectedContest}
					selectedDateInDashboard={selectedDateInDashboard}
					setSelectedDateInDashboard={setSelectedDateInDashboard}
					currentChallenge={currentChallenge}
					challenges={challenges}
					posts={posts[viewingUserId]}
				/>
				:
				<AdminContestOverview
					userSelectedContest={userSelectedContest}
					selectedDateInDashboard={selectedDateInDashboard}
					setSelectedDateInDashboard={setSelectedDateInDashboard}
					setViewingUserId={setViewingUserId}
					currentChallenge={currentChallenge}
					users={users}
					posts={posts}
				/>
			}
		</Container>
	)
}