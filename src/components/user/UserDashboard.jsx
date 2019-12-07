import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { isAfter } from 'date-fns'
import { useDataContext } from '../../contexts/useDataContext'
import { useUIContext } from '../../contexts/useUIContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import UserContestOverview from './UserContestOverview'
import SelectContestDropdown from '../shared/SelectContestDropdown'

import { sortByMostCurrentStartDate } from '../../modules/functions'

const UserDashboard = (props) => {
  const [userSelectedContest, setUserSelectedContest] = useState()
  const [localContestId, setLocalContestId] = useLocalStorage('E2PSelectedContest', '')
  // When user switches contest, we adjust the selected date to be within the contest dates
  React.useEffect(() => {
    if (!userSelectedContest) { return }
    const selectedDateIsAfterContestEnd = isAfter(selectedDateInDashboard, new Date(userSelectedContest.endDate))
    const selectedDateIsBeforeContestStart = isAfter(new Date(userSelectedContest.startDate), selectedDateInDashboard)
    if (selectedDateIsAfterContestEnd) {
      setSelectedDateInDashboard(new Date(userSelectedContest.endDate))
    }
    if (selectedDateIsBeforeContestStart) {
      setSelectedDateInDashboard(new Date(userSelectedContest.startDate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelectedContest])
  const handleSelectedContestChange = (contest) => {
    setUserSelectedContest(contest)
    setLocalContestId(contest.uid)
  }
  const { appData } = useDataContext()
  const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
  const { contests, posts, me, challenges } = appData
  const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
  const userEnrolledContests = me && me.contests && Object.keys(me.contests).map((contestKey) => contests[contestKey])
  const currentChallenge = () => {
    const challengeForDay = challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
    const endDate = new Date(userSelectedContest.endDate)
    const startDate = new Date(userSelectedContest.startDate)
    const selectedDateAfterContestEnd = isAfter(selectedDateInDashboard, endDate)
    const selectedDateBeforeContestStart = isAfter(startDate, selectedDateInDashboard)
    if (selectedDateAfterContestEnd) {
      setSelectedDateInDashboard(new Date(userSelectedContest.endDate))
    }
    if (selectedDateBeforeContestStart) {
      setSelectedDateInDashboard(new Date(userSelectedContest.startDate))
    }
    if (challenges && challengeForDay) {
      return challengeForDay
    }
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
        <SelectContestDropdown
          handleSelectedContestChange={handleSelectedContestChange}
          contests={userEnrolledContests}
          userSelectedContest={userSelectedContest}
        />
        <UserContestOverview
          me={me}
          userSelectedContest={userSelectedContest}
          selectedDateInDashboard={selectedDateInDashboard}
          setSelectedDateInDashboard={setSelectedDateInDashboard}
          currentChallenge={currentChallenge()}
          challenges={challenges}
          posts={postsForSelectedContest}
        />
      </Container>
    )
  }
}
export default UserDashboard