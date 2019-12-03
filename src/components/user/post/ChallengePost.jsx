import React, { useState } from 'react'
import { format, differenceInCalendarDays } from 'date-fns'
import { Container, Badge, Form } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import WaterChallengeInputs from './WaterChallengeInputs'
import VegetableChallengeInputs from './VegetableChallengeInputs'
import ProteinChallengeInputs from './ProteinChallengeInputs'
import ExcerciseChallengeInputs from './ExcerciseChallengeInputs'
import CarbChallengeInputs from './CarbChallengeInputs'
import SugarSaltChallengeInputs from './SugarSaltChallengeInputs'
import UserDidCheckin from '../../shared/UserDidCheckin'

export default function ChallengePost(props) {
  const [waterTargetMet, setWaterTargetMet] = useState(false)
  const [vegetableTargetMet, setVegetableTargetMet] = useState(false)
  const [proteinTargetMet, setProteinTargetMet] = useState(false)
  const [excerciseTargetMet, setExcerciseTargetMet] = useState(false)
  const [carbTargetMet, setCarbTargetMet] = useState(false)
  const [sugarSaltTargetMet, setSugarSaltTargetMet] = useState(false)

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
      targetsMet: (
        waterTargetMet ||
        vegetableTargetMet ||
        proteinTargetMet ||
        excerciseTargetMet ||
        carbTargetMet ||
        sugarSaltTargetMet
      ),
      data: {
        ...currentPost.data,
        challenge1: {
          quantityWaterDrank: (event.target.quantityWaterDrank && event.target.quantityWaterDrank.value) || currentPost.data.challenge1.quantityWaterDrank,
          quantityWaterDrankUnits: (event.target.quantityWaterDrankUnits && event.target.quantityWaterDrankUnits.value) || currentPost.data.challenge1.quantityWaterDrankUnits,
        },
        challenge2: {
          servingsVegetablesEaten: (event.target.servingsVegetablesEaten && event.target.servingsVegetablesEaten.value) || currentPost.data.challenge2.servingsVegetablesEaten,
        },
        challenge3: {
          proteinConsumed: (event.target.proteinConsumed && event.target.proteinConsumed.value) || currentPost.data.challenge3.proteinConsumed,
        },
        challenge4: {
          defaultMeasurementUnits: 'minutes',
          lightExcerciseDuration: (event.target.lightExcerciseDuration && event.target.lightExcerciseDuration.value) || currentPost.data.challenge4.lightExcerciseDuration,
          mediumExcerciseDuration: (event.target.mediumExcerciseDuration && event.target.mediumExcerciseDuration.value) || currentPost.data.challenge4.mediumExcerciseDuration,
          heavyExcerciseDuration: (event.target.heavyExcerciseDuration && event.target.heavyExcerciseDuration.value) || currentPost.data.challenge4.heavyExcerciseDuration,
        },
        challenge5: {
          refinedCarbsConsumed: (event.target.refinedCarbsConsumed && event.target.refinedCarbsConsumed.value) || currentPost.data.challenge5.refinedCarbsConsumed,
        },
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
          waterTargetMet={waterTargetMet}
          setWaterTargetMet={setWaterTargetMet}
        />
      )
    }
    if (challengeId === 'challenge2') {
      return (
        <VegetableChallengeInputs
          currentPost={currentPost}
          vegetableTargetMet={vegetableTargetMet}
          setVegetableTargetMet={setVegetableTargetMet}
        />
      )
    }
    if (challengeId === 'challenge3') {
      return (
        <ProteinChallengeInputs
          currentPost={currentPost}
          proteinTargetMet={proteinTargetMet}
          setProteinTargetMet={setProteinTargetMet}
        />
      )
    }
    if (challengeId === 'challenge4') {
      return (
        <ExcerciseChallengeInputs
          currentPost={currentPost}
          excerciseTargetMet={excerciseTargetMet}
          setExcerciseTargetMet={setExcerciseTargetMet}
        />
      )
    }
    if (challengeId === 'challenge5') {
      return (
        <CarbChallengeInputs
          currentPost={currentPost}
          carbTargetMet={carbTargetMet}
          setCarbTargetMet={setCarbTargetMet}
        />
      )
    }
    if (challengeId === 'challenge6') {
      return (
        <SugarSaltChallengeInputs
          currentPost={currentPost}
          sugarSaltTargetMet={sugarSaltTargetMet}
          setSugarSaltTargetMet={setSugarSaltTargetMet}
        />
      )

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

const LastEditedReadout = ({ lastEditedAt }) => {
  return (lastEditedAt && (
    <p className='mt-1'>
      <small className='text-center text-info'>
        {`Last edit: ${format(new Date(lastEditedAt), 'Pp')}`}
      </small>
    </p>
  )) || null
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