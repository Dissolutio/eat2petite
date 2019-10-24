import React from 'react'
import { Container } from 'reactstrap'
import { sortByMostCurrentStartDate } from './utils'
import { useDataContext } from '../../../contexts/useDataContext'
import UserContestDashboard from './UserContestDashboard'
import UserContestsList from '../UserContestsList'

export const UserHomepage = (props) => {
  const [userSelectedContest, setUserSelectedContest] = React.useState()
  const [hasFiredAutoSelect, setHasFiredAutoSelect] = React.useState(false)

  const { appData, createUserPost } = useDataContext()
  const { contests, posts, me } = appData
  const { contestChosen } = props
  const userEnrolledContests =
    me.contests &&
    Object.keys(me.contests).map((contestKey) => contests[contestKey])

  if (contestChosen && !hasFiredAutoSelect) {
    setHasFiredAutoSelect(true)
    setUserSelectedContest(contestChosen)
  }

  const sortedByMostRecent = userEnrolledContests && [
    ...userEnrolledContests.sort(sortByMostCurrentStartDate),
  ]
  const autoSelectedContest = userEnrolledContests && sortedByMostRecent[0]

  if (autoSelectedContest && !hasFiredAutoSelect && !contestChosen) {
    setHasFiredAutoSelect(true)
    setUserSelectedContest(autoSelectedContest)
  }
  if (userSelectedContest) {
    return (
      <Container>
        <UserContestDashboard userSelectedContest={userSelectedContest} />
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
      <UserContestsList contests={contests} userSelectedContest={userSelectedContest} />
    </Container>
  )
}
