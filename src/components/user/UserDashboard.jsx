import React, { useState } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'

import { useDataContext } from '../../contexts/useDataContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import UserContestOverview from './UserContestOverview'
import UserSelectContestDropdown from './UserSelectContestDropdown'
import UserContestsList from './UserContestsList'

import { sortByMostCurrentStartDate } from '../../modules/functions'

const UserDashboard = (props) => {
  const [userSelectedContest, setUserSelectedContest] = useState()
  const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
  const handleSelectedContestChange = (contest) => {
    setUserSelectedContest(contest)
    setLocalContestId(contest.uid)
  }

  const { appData } = useDataContext()
  const { contests, posts, me, challenges } = appData

  const [hasInitialized, setHasInitialized] = useState(false)
  const userEnrolledContestsArr = me.contests && Object.keys(me.contests).map((contestKey) => contests[contestKey])

  if (!hasInitialized && userEnrolledContestsArr) {
    const queryParams = queryString.parse(props.location.search)
    const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
    const localContest = contests[localContestId]
    const mostRecentlyStartedContest = userEnrolledContestsArr && [...userEnrolledContestsArr.sort(sortByMostCurrentStartDate)][0]
    if (queryContest) {
      handleSelectedContestChange(queryContest)
      setHasInitialized(true)
    } else if (localContest) {
      setUserSelectedContest(localContest)
      setHasInitialized(true)
    } else if (mostRecentlyStartedContest) {
      handleSelectedContestChange(mostRecentlyStartedContest)
      setHasInitialized(true)
    }
  }

  if (!userSelectedContest) {
    return (
      <Container className="text-center">
        <h1 className="text-center">User Dashboard</h1>
        <hr />
        <UserContestsList contests={contests} userSelectedContest={userSelectedContest} />
      </Container>
    )
  }
  if (userSelectedContest) {
    return (
      <Container>
        <UserSelectContestDropdown contests={userEnrolledContestsArr} userSelectedContest={userSelectedContest} />
        <UserContestOverview me={me} userSelectedContest={userSelectedContest} challenges={challenges} posts={posts} />
      </Container>
    )
  }
}
export default UserDashboard