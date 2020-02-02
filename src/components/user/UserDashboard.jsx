import React from 'react'

import { useRealtimeDataContext, useUIContext } from 'contexts'
import { useKeepDateInContestRange } from '../../hooks'
import { UserContestOverview } from 'components'
import { sortByMostCurrentStartDate } from 'helpers'

export default function UserDashboard(props) {
  const { appData } = useRealtimeDataContext()
  const {
    selectedDate,
    setSelectedDate,
    selectedContestId,
    setSelectedContestId,
  } = useUIContext()
  const { contests, challenges, userPosts, personalProfile } = appData
  const selectedContest = contests && contests[selectedContestId]
  useKeepDateInContestRange(selectedContest, selectedDate, setSelectedDate)

  const userEnrolledContests = () => {
    return (
      me &&
      contests &&
      me.contests &&
      Object.keys(me.contests).map((contestKey) => contests[contestKey])
    )
  }
  // Auto select a contest
  if (contestsArray && !selectedContest) {
    const sortedByStartDate = contestsArray.sort(sortByMostCurrentStartDate)
    const mostRecentlyStartedContest = sortedByStartDate[0]
    const contestId = mostRecentlyStartedContest.uid
    if (contestId) {
      setSelectedContestId(contestId)
    }
  }
  // Don't render until there IS a contest
  if (!selectedContest) {
    return <p>No contests found!</p>
  }
  const currentChallenge =
    challenges[userSelectedContest.getChallengeForDate(selectedDateInDashboard)]
  // Get the challenge for the currently selected date
  const currentChallengeId = selectedContest.getChallengeForDate(selectedDate)
  const currentChallenge = challenges[currentChallengeId]
  const allPostsArray = adminPosts && Object.values(adminPosts)
  const postsForSelectedContest =
    allPostsArray &&
    allPostsArray.filter((post) => post.contestId === selectedContestId)

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
