import React from 'react'
import { format, differenceInCalendarDays } from 'date-fns'
import { Container, Badge } from 'reactstrap'

import { useDataContext } from '../../contexts/useDataContext'
import WaterChallengePost from './WaterChallengePost'

export default function ChallengePost(props) {
  const { buildNewPost, savePost } = useDataContext()
  const { userSelectedContest, selectedDateInDashboard, me, currentChallenge, currentPost, challenges } = props
  const selectedDateIsFutureDate = differenceInCalendarDays(new Date(), new Date(selectedDateInDashboard)) < 0
  if (!currentChallenge) {
    return <h5>No challenge for today!</h5>
  }
  if (!currentPost && !selectedDateIsFutureDate) {
    savePost(buildNewPost(selectedDateInDashboard, currentChallenge, userSelectedContest.uid))
    return <h1>Loading</h1>
  }

  const PostFormForDay = () => (
    currentPost ?
      (<Container>
        <CheckedIn />
        <WaterChallengePost
          selectedDateInDashboard={selectedDateInDashboard}
          me={me}
          currentPost={currentPost}
          currentChallenge={currentChallenge}
          challenges={challenges}
          selectedDateIsFutureDate={selectedDateIsFutureDate}
        />
        <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
      </Container>)
      : null
  )
  const CheckedIn = () => {
    return (
      <div>
        {currentPost.checkedInBonus ?
          <Badge style={{ backgroundColor: "var(--E2P-orange" }} pill>Checked-in! +2</Badge>
          : null}
      </div>
    )
  }
  const LastEditedReadout = () => {
    if (!currentPost.lastEditedAt) { return null }
    return (
      <p className='mt-1'>
        <small className='text-center text-info'>
          {`Last edit: ${format(new Date(currentPost.lastEditedAt), 'Pp')}`}
        </small>
      </p>
    )
  }
  return (
    <Container className="border border-primary rounded p-4 mt-4 mb-3 text-center">
      <h5 className='text-primary border-bottom border-primary'>{currentChallenge.challengeName}</h5>
      <p className='text-secondary'>{format(selectedDateInDashboard, 'P')}</p>
      <PostFormForDay />
    </Container>
  )
}