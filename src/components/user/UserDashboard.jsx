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
  const userEnrolledContests = me && me.contests && Object.keys(me.contests).map((contestKey) => contests[contestKey])
  const queryParams = queryString.parse(props.location.search)
  const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
  if (queryContest && queryParams.selectedContest !== localContestId) {
    handleSelectedContestChange(queryContest)
    setHasAutoSelectedContest(true)
  }

  if (!hasAutoSelectedContest && userEnrolledContests) {
    const localContest = contests[localContestId]
    const mostRecentlyStartedContest = [...userEnrolledContests.sort(sortByMostCurrentStartDate)][0]
    if (localContest) {
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
    const postsForSelectedContest = posts && Object.values(posts).filter(post => post.contestId === userSelectedContest.uid)
    return (
      <Container>
        <UserSelectContestDropdown
          contests={userEnrolledContests}
          userSelectedContest={userSelectedContest}
        />
        <UserContestOverview me={me}
          userSelectedContest={userSelectedContest}
          challenges={challenges}
          posts={postsForSelectedContest}
        />
      </Container>
    )
  }
}
export default UserDashboard