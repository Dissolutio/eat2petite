import React from 'react'
import { format, isSameDay, differenceInCalendarDays, isToday } from 'date-fns'
import { Container } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import FuturePostDateCard from './FuturePostDateCard'
import WaterChallengePost from './challengeForms/WaterChallengePost'

export default function ChallengePost(props) {
  const { savePost } = useDataContext()
  const { userSelectedContest, selectedDate, formDisabled, me, currentPost, currentChallenge, challenges } = props
  const isValidPostDate = differenceInCalendarDays(new Date(), new Date(selectedDate)) >= 0

  if (!currentChallenge) {
    return <h1>No challenge for today!</h1>
  }
  if (!currentPost && isValidPostDate) {
    savePost(buildNewPost())
    return <h1>Loading</h1>
  }
  if (!currentPost) {
    return (
      <FuturePostDateCard
        challengeForDay={currentChallenge}
        date={selectedDate}
      />)
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
  return (
    <Container className="border border-primary rounded p-4 mt-4 mb-3 text-center">

      <MessageForDay selectedDate={selectedDate} currentChallenge={currentChallenge} />
      <WaterChallengePost
        selectedDate={selectedDate}
        formDisabled={formDisabled}
        me={me}
        currentPost={currentPost}
        currentChallenge={currentChallenge}
        challenges={challenges}
      />
      <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
    </Container>
  )
}

const MessageForDay = ({ selectedDate, currentChallenge }) => {
  const { challengeName } = currentChallenge
  return (
    <>
      <h5 className='text-primary border-bottom border-primary'>{challengeName}</h5>
      <p className='text-secondary'>{format(selectedDate, 'P')}</p>
      {isToday(selectedDate) ?
        (<p className='text-secondary'>How much water have you drank today?</p>)
        : (<p className='text-secondary'>How much water did you drink this day?</p>)
      }
    </>
  )
}
const LastEditedReadout = ({ lastEditedAt }) => {
  return (
    <p>
      <small className='text-center text-info'>
        {`Last edit: ${format(new Date(lastEditedAt), 'Pp')}`}
      </small>
    </p>
  )
}
