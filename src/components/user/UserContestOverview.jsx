import React from 'react'
import { Container } from 'reactstrap'
import { format, isSameDay } from 'date-fns'

import SelectContestDropdown from '../shared/SelectContestDropdown'
import DashboardCalendar from '../shared/DashboardCalendar'
import ChallengePost from './ChallengePost'

export default function UserContestOverview(props) {
  const {
    selectedDateInDashboard,
    handleSelectedContestChange,
    setSelectedDateInDashboard,
    selectedContest,
    userEnrolledContests,
    me,
    posts,
    challenges,
    currentChallenge,
  } = props

  if (!selectedContest || !userEnrolledContests || !me) {
    return null
  }
  const { startDate, endDate } = selectedContest
  const postsArr = posts ? Object.values(posts) : []
  const currentPost = () => {
    return postsArr
      .filter((post) => post.contestId === selectedContest.uid)
      .find((post) =>
        isSameDay(new Date(post.postDate), new Date(selectedDateInDashboard)),
      )
  }
  function progressHighlightDateArr() {
    return (
      postsArr &&
      postsArr
        .filter((post) => !!post.lastEditedAt)
        .map((post) => format(new Date(post.postDate), 'MMMM d, yyyy'))
    )
  }
  const successHighlightDateArr = () => {
    function forSuccess(post) {
      const targetsMet = post && post.targetsMet
      return targetsMet && Object.values(targetsMet).some((item) => item)
    }
    function toFormattedDates(post) {
      return format(new Date(post.postDate), 'MMMM d, yyyy')
    }
    const targetsMetDays = postsArr && postsArr.filter(forSuccess)
    return targetsMetDays.map(toFormattedDates)
  }
  return (
    <Container className='text-center'>
      <h3>{selectedContest.title}</h3>
      <SelectContestDropdown
        handleSelectedContestChange={handleSelectedContestChange}
        contests={userEnrolledContests}
        selectedContest={selectedContest}
      />
      <ChallengePost
        selectedDateInDashboard={selectedDateInDashboard}
        selectedContest={selectedContest}
        contestStartDate={new Date(startDate)}
        contestEndDate={new Date(endDate)}
        currentPost={currentPost()}
        currentChallenge={currentChallenge}
        challenges={challenges}
        me={me}
      />
      <Container className='p-1'>
        <DashboardCalendar
          selectedDate={selectedDateInDashboard}
          setSelectedDateInDashboard={setSelectedDateInDashboard}
          minDate={new Date(startDate)}
          maxDate={new Date(endDate)}
          progressHighlightDateArr={progressHighlightDateArr()}
          successHighlightDateArr={successHighlightDateArr()}
        />
      </Container>
    </Container>
  )
}

