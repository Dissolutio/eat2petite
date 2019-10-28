import React from 'react'
import { Container } from 'reactstrap'
import { sortByMostCurrentStartDate } from './utils'
import { useDataContext } from '../../../contexts/useDataContext'
import UserContestDashboard from './UserContestDashboard'
import UserContestsList from '../UserContestsList'
const queryString = require('query-string')

export const UserHomepage = (props) => {
  const [userSelectedContest, setUserSelectedContest] = React.useState()
  const [hasInitialized, setHasInitialized] = React.useState(false)

  const { appData } = useDataContext()
  const { contests, posts, me } = appData
  const queryParams = queryString.parse(props.location.search)
  const userEnrolledContests = me.contests && Object.keys(me.contests).map((contestKey) => contests[contestKey])
  const sortedByMostRecent = userEnrolledContests && [...userEnrolledContests.sort(sortByMostCurrentStartDate)]
  const autoSelectedContest = userEnrolledContests && sortedByMostRecent[0]
  const queryContest = queryParams.selectedContest && contests[queryParams.selectedContest]
  if (!hasInitialized) {
    if (queryContest) {
      setUserSelectedContest(queryContest)
    } else if (autoSelectedContest) {
      setUserSelectedContest(autoSelectedContest)
    }
    setHasInitialized(true)
  }

  if (userSelectedContest) {
    return (
      <Container>
        <UserContestDashboard me={me} userSelectedContest={userSelectedContest} posts={posts} />
        <UserContestsList
          userEnrolledContests={userEnrolledContests}
          userSelectedContest={userSelectedContest}
          setUserSelectedContest={setUserSelectedContest}
        />
      </Container>
    )
  }
  return (
    <Container className="text-center">
      <h1 className="text-center">User Dashboard</h1>
      <hr />
      <UserContestsList contests={contests} userSelectedContest={userSelectedContest} setUserSelectedContest={setUserSelectedContest} />
    </Container>
  )
}
