import React, { useState } from 'react'
import { isAfter } from 'date-fns'

import { useUIContext } from 'contexts/useUIContext'
import { useRealtimeData } from 'contexts/useRealtimeData'

import UserContestOverview from './UserContestOverview'

import { sortByMostCurrentStartDate } from 'modules/functions'
import { useLocalStorage } from 'hooks/useLocalStorage'

const UserDashboard = (props) => {
  const [localContestId, setLocalContestId] = useLocalStorage(
    'E2PSelectedContest',
    '',
  )
  const [userSelectedContest, setUserSelectedContest] = useState()
  const [hasAutoSelectedContest, setHasAutoSelectedContest] = useState(false)
  const { appData } = useRealtimeData()
  const { selectedDateInDashboard, setSelectedDateInDashboard } = useUIContext()
  const { contests, challenges } = appData
  const posts = appData.userPosts
  const me = appData.personalProfile

  // KEEP SELECTED DATE WITHIN CONTEST DATES
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
  const userEnrolledContests = () => {
    return me &&
      me.contests &&
      Object.keys(me.contests).map((contestKey) => contests[contestKey])
  }

  // AUTOSELECT MOST RECENT CONTEST
  if (!hasAutoSelectedContest && userEnrolledContests()) {
    const localContest = contests[localContestId]
    const mostRecentlyStartedContest = [
      ...userEnrolledContests().sort(sortByMostCurrentStartDate),
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
        userEnrolledContests={userEnrolledContests()}
        currentChallenge={currentChallenge}
        challenges={challenges}
        posts={postsForSelectedContest}
      />
    )
  }
}
export default UserDashboard
