import React from 'react'
import { Container } from 'reactstrap'
import {
  format,
  eachDayOfInterval,
  addDays,
  isAfter,
  differenceInDays,
} from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'
import { useAuthUserContext } from '../../../contexts/useAuthUserContext'

import { UserDashboardCalendar } from './UserDashboardCalendar'
import UserContestsList from '../UserContestsList'
import WaterChallengePostForm from '../WaterChallengePostForm'

function sortByMostCurrentStartDate(a, b) {
  if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
    return -1
  } else {
    return 1
  }
}
export const UserDashboard = (props) => {
  const { appData } = useDataContext()
  const { contests, posts } = appData
  const { user } = useAuthUserContext()
  const { contestChosen } = props
  const userEnrolledContests =
    user.contests &&
    Object.keys(user.contests).map((contestKey) => contests[contestKey])
  const [userSelectedContest, setUserSelectedContest] = React.useState()
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [hasFiredAutoSelect, setHasFiredAutoSelect] = React.useState(false)
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
    const { daysPerChallenge, numberOfChallenges } = userSelectedContest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(userSelectedContest.startDate)
    const contestEndDate = new Date(
      addDays(contestStartDate, contestLengthInDays),
    )
    const getPostForDay = () => {
      return
    }
    const allContestDays = eachDayOfInterval({
      start: contestStartDate,
      end: contestEndDate,
    })
    const challengeForDay = () => {
      const daysStartToPostDate = differenceInDays(
        selectedDate,
        contestStartDate,
      )
      return daysStartToPostDate
    }
    return (
      <Container>
        {userSelectedContest.startDate && (
          <UserDashboardCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            startDate={contestStartDate}
            endDate={contestEndDate}
          />
        )}
        <WaterChallengePostForm
          userSelectedContest={userSelectedContest}
          selectedDate={format(new Date(selectedDate), 'yyyy-MM-dd')}
          setSelectedDate={setSelectedDate}
          contestStartDate={contestStartDate}
          contestEndDate={contestEndDate}
        />
        <UserContestsList
          contests={contests}
          setUserSelectedContest={setUserSelectedContest}
        />
      </Container>
    )
  }
  return (
    <Container className="text-center">
      <h1 className="text-center">User Dashboard</h1>
      <hr />
      <UserContestsList contests={contests} />
    </Container>
  )
}
