import React from 'react'
import { format, isSameDay, differenceInCalendarDays, isToday } from 'date-fns'
import { Container, Badge, Alert } from 'reactstrap'

import { useDataContext } from '../../contexts/useDataContext'
import WaterChallengePost from './WaterChallengePost'

export default function ChallengePost(props) {
  const { savePost } = useDataContext()
  const { userSelectedContest, selectedDate, me, currentPost, currentChallenge, challenges } = props
  const selectedDateIsFutureDate = differenceInCalendarDays(new Date(), new Date(selectedDate)) < 0

  if (!currentChallenge) {
    return <h5>No challenge for today!</h5>
  }
  if (!currentPost && !selectedDateIsFutureDate) {
    savePost(buildNewPost())
    return <h1>Loading</h1>
  }

  function newPostTarget() {
    const userTargetForDate = me.challengeTargetsForDates && me.challengeTargetsForDates[`${format(new Date(selectedDate), 'yyyy-MM-dd')}`]
    const userChallengeTarget = me.challengeTargets && me.challengeTargets[currentChallenge.uid]
    const challengeDefaultTarget = challenges[currentChallenge.uid] && challenges[currentChallenge.uid].defaultTarget
    return userTargetForDate || userChallengeTarget || challengeDefaultTarget
  }
  function buildNewPost() {
    const createdAt = (new Date()).toString()
    const postDate = format(new Date(selectedDate), 'P')
    const checkedInBonus = isSameDay(new Date(createdAt), new Date(postDate))
    return {
      author: me.uid,
      userId: me.uid,
      uid: null,
      contestId: userSelectedContest.uid,
      challengeId: currentChallenge.uid,
      postDate,
      createdAt,
      quantityDrank: 0,
      quantityDrankUnits: 'cups',
      checkedInBonus,
      target: newPostTarget(),
    }
  }
  const PostFormForDay = () => (currentPost ? (<Container>
    <CheckedIn />
    <WaterChallengePost
      selectedDate={selectedDate}
      me={me}
      currentPost={currentPost}
      currentChallenge={currentChallenge}
      challenges={challenges}
      selectedDateIsFutureDate={selectedDateIsFutureDate}
    />
    <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
  </Container>) : null
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
      <p className='text-secondary'>{format(selectedDate, 'P')}</p>
      <PostFormForDay />
    </Container>
  )
}
