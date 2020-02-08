import React from 'react'
import { format, isSameDay } from 'date-fns'
import { Container } from 'reactstrap'

import { useRealtimeDataContext, useUIContext } from 'contexts'
import { useKeepDateInContestRange } from 'hooks'
import {
  SelectContestDropdown,
  DashboardCalendar,
  ChallengePost
} from 'components'
import {
  successHighlightDateArr,
  progressHighlightDateArr,
  sortByMostCurrentStartDate
} from 'helpers'

export default function UserDashboard() {
  const { appData, saveNewPost } = useRealtimeDataContext()
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
      Object.keys(personalProfile.contests)
        .map((contestKey) => contests[contestKey])
    )
  }
  const userPostsArr = userPosts ? Object.values(userPosts) : []
  // This is the format for post ID's, to prevent duplication
  const currentPostId = `${format(new Date(selectedDate), 'yyyy-MM-dd')}${selectedContestId}`
  const currentPost = userPosts[currentPostId]

  return (
    <Container className='text-center'>
      <h3>{selectedContest.title}</h3>
      <SelectContestDropdown
        contests={userEnrolledContests()}
        selectedContest={selectedContest}
        setSelectedContestId={setSelectedContestId}
      />
      <ChallengePost
        selectedDate={selectedDate}
        selectedContest={selectedContest}
        contestStartDate={new Date(selectedContest.startDate)}
        contestEndDate={new Date(selectedContest.endDate)}
        currentPost={currentPost}
        currentChallenge={currentChallenge}
        challenges={challenges}
        me={personalProfile}
      />
      <Container className='p-1'>
        <DashboardCalendar
          selectedDate={selectedDate}
          setSelectedDateInDashboard={setSelectedDate}
          minDate={new Date(selectedContest.startDate)}
          maxDate={new Date(selectedContest.endDate)}
          progressHighlightDateArr={progressHighlightDateArr(userPostsArr)}
          successHighlightDateArr={successHighlightDateArr(userPostsArr)}
        />
      </Container>
    </Container>
  )
}
