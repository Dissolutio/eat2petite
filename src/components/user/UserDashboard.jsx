import React, { useState } from 'react'
import { isAfter } from 'date-fns'
import { useDataContext } from '../../contexts/useDataContext'
import { useUIContext } from '../../contexts/useUIContext'
import { useLocalStorage } from '../../modules/hooks/useLocalStorage'

import UserContestOverview from './UserContestOverview'

import { sortByMostCurrentStartDate } from '../../modules/functions'

const UserDashboard = (props) => {
  const [localContestId, setLocalContestId] = useLocalStorage(
    'E2PSelectedContest',
    '',
  )
  const { appData } = useDataContext()
  const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
  const { contests, posts, me, challenges } = appData
  const [userSelectedContest, setUserSelectedContest] = useState()
  const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)

  // When user switches contest, we adjust the selected date
  // to be within the contest dates
  React.useEffect(() => {
    if (!userSelectedContest) {
      return
    }
    const selectedDateIsAfterContestEnd = isAfter(
      selectedDateInDashboard,
      new Date(userSelectedContest.endDate),
    )
    const selectedDateIsBeforeContestStart = isAfter(
      new Date(userSelectedContest.startDate),
      selectedDateInDashboard,
    )
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
  const userEnrolledContests =
    me &&
    me.contests &&
    Object.keys(me.contests).map((contestKey) => contests[contestKey])

  // AUTOSELECT MOST RECENT CONTEST
  if (!hasAutoSelectedContest && userEnrolledContests) {
    const localContest = contests[localContestId]
    const mostRecentlyStartedContest = [
      ...userEnrolledContests.sort(sortByMostCurrentStartDate),
    ][0]
    if (localContest) {
      setUserSelectedContest(localContest)
      setHasAutoSelectedContest(true)
    } else if (mostRecentlyStartedContest) {
      handleSelectedContestChange(mostRecentlyStartedContest)
      setHasAutoSelectedContest(true)
    }
  }

  if (!userSelectedContest) {
    return <p>You are not enrolled in any contests!</p>
  }

  const currentChallenge =
    challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]

  const postsForSelectedContest =
    posts &&
    Object.values(posts).filter((post) => {
      return post.contestId === userSelectedContest.uid
    })

  if (userSelectedContest) {
    return (
      <UserContestOverview
        me={me}
        userSelectedContest={userSelectedContest}
        handleSelectedContestChange={handleSelectedContestChange}
        selectedDateInDashboard={selectedDateInDashboard}
        setSelectedDateInDashboard={setSelectedDateInDashboard}
        userEnrolledContests={userEnrolledContests}
        currentChallenge={currentChallenge}
        challenges={challenges}
        posts={postsForSelectedContest}
      />
    )
  }
}
export default UserDashboard
