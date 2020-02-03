import React from 'react'
import { format, isSameDay } from 'date-fns'
import { Container, Button } from 'reactstrap'

import { useRealtimeDataContext, useUIContext } from 'contexts'
import { useKeepDateInContestRange } from 'hooks'
import { UserContestOverview } from 'components'
import { sortByMostCurrentStartDate } from 'helpers'

export default function UserDashboard() {
  const { appData } = useRealtimeDataContext()
  const { contests, challenges, userPosts, personalProfile } = appData
  const {
    selectedDate,
    setSelectedDate,
    selectedContestId,
    setSelectedContestId,
  } = useUIContext()
  const contestsArray = contests && Object.values(contests)
  const selectedContest = contests && contests[selectedContestId]
  useKeepDateInContestRange(selectedContest, selectedDate, setSelectedDate)
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
    return (<p>No contests found!</p>)
  }
  // Get the challenge for the currently selected date
  const currentChallengeId = selectedContest.getChallengeForDate(selectedDate)
  const currentChallenge = challenges[currentChallengeId]
  // User perspective
  const userEnrolledContests = () => {
    return (
      personalProfile &&
      contests &&
      personalProfile.contests &&
      Object.keys(personalProfile.contests).map((contestKey) => contests[contestKey])
    )
  }
  const userPostsForContest = () => {
    return userPosts && Object.values(userPosts)
      .filter(post => (post.contestId === selectedContest.uid))
  }
  console.log("TCL: userPostsForContest -> userPostsForContest", userPostsForContest())
  return (
    <UserContestOverview
      me={personalProfile}
      userSelectedContest={selectedContest}
      handleSelectedContestChange={setSelectedContestId}
      selectedDateInDashboard={selectedDate}
      setSelectedDateInDashboard={setSelectedDate}
      userEnrolledContests={userEnrolledContests()}
      currentChallenge={currentChallenge}
      challenges={challenges}
      posts={userPostsForContest()}
    />
  )
}
