import React, { useState } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'

import { useLocalStorage } from '../../modules/hooks/useLocalStorage'
import { sortByMostCurrentStartDate } from '../../modules/functions'

import AdminContestOverview from './AdminContestOverview'
import AdminSelectContestDropdown from './AdminSelectContestDropdown'

export default function AdminDashboard(props) {
	const [userSelectedContest, setUserSelectedContest] = useState()
	const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
	const handleSelectedContestChange = (contest) => {
		setUserSelectedContest(contest)
		setLocalContestId(contest.uid)
	}
	const { contests, posts, challenges, users } = props

	const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
	const contestsArray = contests && Object.values(contests)

	if (!hasAutoSelectedContest && contestsArray) {
		const queryParams = queryString.parse(props.location.search)
		const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
		const localContest = contests[localContestId]
		const mostRecentlyStartedContest = [...contestsArray.sort(sortByMostCurrentStartDate)][0]
		if (queryContest) {
			handleSelectedContestChange(queryContest)
			setHasAutoSelectedContest(true)
		} else if (localContest) {
			setUserSelectedContest(localContest)
			setHasAutoSelectedContest(true)
		} else if (mostRecentlyStartedContest) {
			handleSelectedContestChange(mostRecentlyStartedContest)
			setHasAutoSelectedContest(true)
		}
	}

	if (!userSelectedContest) { return null }
	return (
		<Container>
			<AdminSelectContestDropdown contests={contestsArray} userSelectedContest={userSelectedContest} />
			<AdminContestOverview userSelectedContest={userSelectedContest} users={users} challenges={challenges} posts={posts} />
		</Container>
	)
}