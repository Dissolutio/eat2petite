import React, { useState } from 'react'
import { Container } from 'reactstrap'
import queryString from 'query-string'

import { useDataContext } from '../../contexts/useDataContext'
import UserContestDashboard from './UserContestDashboard'
import { UserSelectContestDropdown } from './UserSelectContestDropdown'
import UserContestsList from './UserContestsList'

import { sortByMostCurrentStartDate } from '../../modules/functions'

export const UserDashboard = (props) => {
  const [userSelectedContest, setUserSelectedContest] = useState()
  const [hasInitialized, setHasInitialized] = useState(false)

  const { appData } = useDataContext()
  const { contests, posts, me, challenges } = appData
  const queryParams = queryString.parse(props.location.search)
  const userEnrolledContestIds = me.contests ? Object.keys(me.contests) : []
  const userEnrolledContests = userEnrolledContestIds.map((contestKey) => contests[contestKey])
  const sortedByMostRecent = [...userEnrolledContests.sort(sortByMostCurrentStartDate)]
  const autoSelectedContest = sortedByMostRecent[0]
  const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
  if (!hasInitialized && userEnrolledContests) {
    console.log("TCL: UserDashboard -> userEnrolledContests", userEnrolledContests)
    console.log("TCL: UserDashboard -> hasInitialized", hasInitialized)
    if (queryContest) {
      setUserSelectedContest(queryContest)
      setHasInitialized(true)
    } else if (autoSelectedContest) {
      setUserSelectedContest(autoSelectedContest)
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
