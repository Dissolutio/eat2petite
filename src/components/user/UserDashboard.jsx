import React from 'react'
import { isSameDay } from 'date-fns'
import { Container } from 'reactstrap'

import { useRealtimeDataContext, useUIContext } from 'contexts'
import { useKeepDateInContestRange } from 'hooks'
import SelectContestDropdown from '../shared/SelectContestDropdown'
import DashboardCalendar from '../shared/DashboardCalendar'
import ChallengePost from './ChallengePost'
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
  const [alreadyMakingPost, setAlreadyMakingPost] = React.useState(false)

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
  const userPostsForSelectedContest = userPostsArr && userPostsArr.filter(post => (post.contestId === selectedContestId))
  const userPostForSelectedDate = userPostsForSelectedContest && userPostsForSelectedContest.find((post) =>
    isSameDay(new Date(post.postDate), new Date(selectedDate)),
  )
  // Rendering before posts are present means many new posts will be made in ChallengePost
  if (!userPostForSelectedDate && currentChallenge && !alreadyMakingPost) {
    setAlreadyMakingPost(true)
    saveNewPost(
      selectedDate,
      currentChallenge,
      selectedContestId
    )
    return <h1>Creating post for selected date...</h1>
  }

  return (
    <Container className='text-center'>
      <h3>{selectedContest.title}</h3>
      <SelectContestDropdown
        contests={userEnrolledContests()}
        selectedContest={selectedContest}
        setSelectedContestId={setSelectedContestId}
      />
      <ChallengePost
        selectedDateInDashboard={selectedDate}
        selectedContest={selectedContest}
        contestStartDate={new Date(selectedContest.startDate)}
        contestEndDate={new Date(selectedContest.endDate)}
        currentPost={userPostForSelectedDate}
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
