import React from 'react'
import { format, differenceInCalendarDays } from 'date-fns'
import { Container, Badge, Button, Form } from 'reactstrap'

import { useDataContext } from '../../contexts/useDataContext'
import WaterChallengeInputs from './WaterChallengeInputs'
import VegetableChallengeInputs from './VegetableChallengeInputs'
import ProteinChallengeInputs from './ProteinChallengeInputs'

export default function ChallengePost(props) {
  const { saveNewPost, updateUserPost } = useDataContext()
  const { userSelectedContest, selectedDateInDashboard, me, currentChallenge, currentPost, challenges } = props
  const selectedDateIsFutureDate = differenceInCalendarDays(new Date(), new Date(selectedDateInDashboard)) < 0
  if (!currentChallenge) {
    return <h5>No challenge for today!</h5>
  }
  if (!currentPost && !selectedDateIsFutureDate) {
    saveNewPost(selectedDateInDashboard, currentChallenge, userSelectedContest.uid)
    return <h1>Creating post for selected date...</h1>
  }
  function buildUpdatePost(event) {
    const updatedPostTarget = (challengeId) => {
      const userTargetForDate = me.challengeTargetsForDates && me.challengeTargetsForDates[`${format(selectedDateInDashboard, 'yyyy-MM-dd')}`]
      const currentPostHasTarget = currentPost && currentPost.targets[challengeId]
      const userChallengeTarget = me.challengeTargets && me.challengeTargets[challengeId]
      const challengeDefaultTarget = challenges[challengeId] && challenges[challengeId].defaultTarget
      return userTargetForDate || currentPostHasTarget || userChallengeTarget || challengeDefaultTarget
    }
    return {
      ...currentPost,
      lastEditedAt: (new Date()).toString(),
      data: {
        ...currentPost.data,
        challenge1: {
          quantityWaterDrank: (event.target.quantityWaterDrank && event.target.quantityWaterDrank.value) || currentPost.data.challenge1.quantityWaterDrank,
          quantityWaterDrankUnits: (event.target.quantityWaterDrankUnits && event.target.quantityWaterDrankUnits.value) || currentPost.data.challenge1.quantityWaterDrankUnits,
        },
        challenge2: {
          servingsVegetablesEaten: (event.target.servingsVegetablesEaten && event.target.servingsVegetablesEaten.value) || currentPost.data.challenge2.servingsVegetablesEaten,
        }
      },
      targets: {
        challenge1: updatedPostTarget('challenge1'),
        challenge2: updatedPostTarget('challenge2'),
        challenge3: updatedPostTarget('challenge3'),
        challenge4: updatedPostTarget('challenge4'),
        challenge5: updatedPostTarget('challenge5'),
        challenge6: updatedPostTarget('challenge6'),
      },
    }
  }
  function onSubmitForm(event) {
    event.preventDefault()
    updateUserPost(buildUpdatePost(event))
  }
  const PostFormForDay = ({ currentPost, currentChallenge }) => {
    const challengeId = currentChallenge.uid
    if (challengeId === 'challenge1') {
      return (
        <WaterChallengeInputs
          currentPost={currentPost}
        />
      )
    }
    if (challengeId === 'challenge2') {
      return (
        <VegetableChallengeInputs
          currentPost={currentPost}
        />
      )
    }
    if (challengeId === 'challenge3') {
      return (
        <ProteinChallengeInputs
          currentPost={currentPost}
        />
      )
    }
    if (challengeId === 'challenge4') {
      return null
    }
    if (challengeId === 'challenge5') {
      return null
    }
    if (challengeId === 'challenge6') {
      return null

    }
    return (
      null
    )
  }
  return (
    <Container className="border border-primary rounded p-3 mt-4 mb-3 text-center">
      <h5 className='text-primary border-bottom border-primary'>{currentChallenge.challengeName}</h5>
      <h4 className='text-secondary'>{format(selectedDateInDashboard, 'P')}</h4>
      <Form onSubmit={onSubmitForm} >
        {
          currentPost ? (
            <Container>
              <UserDidCheckin checkedInBonus={currentPost.checkedInBonus} />
              <PostFormForDay currentPost={currentPost} currentChallenge={currentChallenge} />
              <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
            </Container>
          )
            : null
        }
      </Form>
    </Container>
  )
}
const UserDidCheckin = ({ checkedInBonus }) => {
  return (
    <div>
      {checkedInBonus ?
        <Badge style={{ backgroundColor: "var(--E2P-orange" }} pill>Checked-in! +2</Badge>
        : null}
    </div>
  )
}
const LastEditedReadout = ({ lastEditedAt }) => {
  return (lastEditedAt && (
    <p className='mt-1'>
      <small className='text-center text-info'>
        {`Last edit: ${format(new Date(lastEditedAt), 'Pp')}`}
      </small>
    </p>
  )) || null
}
export const AppearingSubmitButton = ({ formIsDirty }) => {
  if (!formIsDirty) { return null }
  return (<Button type="submit" >Update Post!</Button>)
}
export const ProgressMsg = ({ userProgressingTowardsGoal, userMetGoal }) => {
  if (userProgressingTowardsGoal) {
    return (
      <span style={{ display: 'block' }}>
        <Badge color='info'>
          Keep it up!
          </Badge>
      </span>
    )
  }
  if (userMetGoal) {
    return (
      <span style={{ display: 'block' }}>
        <Badge color='success'>
          You met your goal!
              </Badge>
      </span>
    )
  } else {
    return null
  }
}