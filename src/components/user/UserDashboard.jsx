import React, { useState } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'

import { useDataContext } from '../../contexts/useDataContext'
import UserContestDashboard from './UserContestDashboard'
import { UserSelectContestDropdown } from './UserSelectContestDropdown'
import UserContestsList from './UserContestsList'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import { sortByMostCurrentStartDate } from '../../modules/functions'

export const UserDashboard = (props) => {
  const [userSelectedContest, setUserSelectedContest] = useState()
  const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
  const [hasInitialized, setHasInitialized] = useState(false)
  const { appData } = useDataContext()
  const { contests, posts, me, challenges } = appData
  const queryParams = queryString.parse(props.location.search)
  const userEnrolledContestIds = me.contests ? Object.keys(me.contests) : []
  const userEnrolledContests = userEnrolledContestIds.map((contestKey) => contests[contestKey])
  const sortedByMostRecent = [...userEnrolledContests.sort(sortByMostCurrentStartDate)]
  const autoSelectedContest = sortedByMostRecent[0]
  const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
  const handleSelectedContestChange = (contest) => {
    setUserSelectedContest(contest)
    setLocalContestId(contest.uid)
  }
  if (!hasInitialized && userEnrolledContests) {
    if (queryContest) {
      handleSelectedContestChange(queryContest)
      setHasInitialized(true)
    } else if (localContestId) {
      setUserSelectedContest(contests[localContestId])
      setHasInitialized(true)
    } else if (autoSelectedContest) {
      handleSelectedContestChange(autoSelectedContest)
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
        <UserSelectContestDropdown contests={userEnrolledContests} userSelectedContest={userSelectedContest} />
        <UserContestDashboard me={me} userSelectedContest={userSelectedContest} challenges={challenges} posts={posts} />
      </Container>
    )
  }
}
