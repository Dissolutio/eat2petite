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
    userSelectedContest,
    userEnrolledContests,
    me,
    posts,
    challenges,
    currentChallenge,
  } = props

  if (!userSelectedContest || !userEnrolledContests || !me) {
    return null
  }
  const { startDate, endDate } = userSelectedContest
  const postsArr = posts ? Object.values(posts) : []
  const currentPost = () => {
    return postsArr
      .filter((post) => post.contestId === userSelectedContest.uid)
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
      <h3>{userSelectedContest.title}</h3>
      <SelectContestDropdown
        handleSelectedContestChange={handleSelectedContestChange}
        contests={userEnrolledContests}
        userSelectedContest={userSelectedContest}
      />
      <ChallengePost
        selectedDateInDashboard={selectedDateInDashboard}
        userSelectedContest={userSelectedContest}
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

