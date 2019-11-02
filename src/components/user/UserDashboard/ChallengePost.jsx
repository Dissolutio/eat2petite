import React from 'react'
import { format, isSameDay, differenceInCalendarDays, isToday } from 'date-fns'
import { Container } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import WaterChallengePost from './challengeForms/WaterChallengePost'

export default function ChallengePost(props) {
  const { savePost } = useDataContext()
  const { userSelectedContest, selectedDate, me, currentPost, currentChallenge, challenges } = props
  const selectedDateIsFutureDate = differenceInCalendarDays(new Date(), new Date(selectedDate)) < 0
  console.log("TCL: ChallengePost -> selectedDateIsFutureDate", selectedDateIsFutureDate)

  if (!currentChallenge) {
    return <h1>No challenge for today!</h1>
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
      lastEditedAt: createdAt,
      target: newPostTarget(),
    }
  }
  const PostFormForDay = () => (
    currentPost ?
      (
        <>
          <WaterChallengePost
            selectedDate={selectedDate}
            me={me}
            currentPost={currentPost}
            currentChallenge={currentChallenge}
            challenges={challenges}
          />
          <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
        </>
      )
      : null
  )
  const MessageForDay = () => {
    return (
      isToday(selectedDate) ?
        (<p className='text-secondary'>How much water have you drank today?</p>)
        : selectedDateIsFutureDate ?
          (<p className='text-secondary'>This is a future day!</p>)
          :
          (<p className='text-secondary'>How much water did you drink this day?</p>)
    )
  }
  const LastEditedReadout = () => {
    return (
      <p>
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
      <MessageForDay />
      <PostFormForDay />
    </Container>
  )
}
