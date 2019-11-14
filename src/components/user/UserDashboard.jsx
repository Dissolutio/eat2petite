import React, { useState } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'

import { useDataContext } from '../../contexts/useDataContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import UserContestOverview from './UserContestOverview'
import UserSelectContestDropdown from './UserSelectContestDropdown'

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
  const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
  const userEnrolledContests = me.contests && Object.keys(me.contests).map((contestKey) => contests[contestKey])

  if (!hasAutoSelectedContest && userEnrolledContests) {
    const queryParams = queryString.parse(props.location.search)
    const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
    const localContest = contests[localContestId]
    const mostRecentlyStartedContest = userEnrolledContests && [...userEnrolledContests.sort(sortByMostCurrentStartDate)][0]
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

  if (!userSelectedContest) {
    return (<p>You are not enrolled in any contests!</p>)
  }
  if (userSelectedContest) {
    return (
      <Container>
        <UserSelectContestDropdown
          contests={userEnrolledContests}
          userSelectedContest={userSelectedContest}
        />
        <UserContestOverview me={me}
          userSelectedContest={userSelectedContest}
          challenges={challenges}
          posts={posts}
        />
      </Container>
    )
  }
}
export default UserDashboard