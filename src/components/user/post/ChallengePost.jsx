import React, { useState } from 'react'
import { Container, Form } from 'reactstrap'
import { format, differenceInCalendarDays, isToday } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'

import UserPostInputs from './UserPostInputs'
import UserDidCheckin from '../../shared/UserDidCheckin'
import LastEditedReadout from './LastEditedReadout'

export default function ChallengePost(props) {
  const { userSelectedContest, selectedDateInDashboard, me, currentChallenge, currentPost, challenges } = props

  const [waterTargetMet, setWaterTargetMet] = useState(false)
  const [vegetableTargetMet, setVegetableTargetMet] = useState(false)
  const [proteinTargetMet, setProteinTargetMet] = useState(false)
  const [excerciseTargetMet, setExcerciseTargetMet] = useState(false)
  const [carbLimitExceeded, setCarbLimitExceeded] = useState(false)
  const [sugarSaltLimitExceeded, setSugarSaltLimitExceeded] = useState(false)

  const { saveNewPost, updateUserPost } = useDataContext()

  const selectedDateIsFutureDate = differenceInCalendarDays(new Date(), new Date(selectedDateInDashboard)) < 0
  const selectedDateIsToday = isToday(selectedDateInDashboard)

  // TODO: Render a placeholder form under these two conditions
  if (!currentChallenge) {
    return <h5>No challenge for today!</h5>
  }
  if (!currentPost && !selectedDateIsFutureDate) {
    saveNewPost(selectedDateInDashboard, currentChallenge, userSelectedContest.uid)
    return <h1>Creating post for selected date...</h1>
  }

  function updatePostTarget(challengeId) {
    const userTargetForDate = me.challengeTargetsForDates && me.challengeTargetsForDates[`${format(selectedDateInDashboard, 'yyyy-MM-dd')}`]
    const currentPostHasTarget = currentPost && currentPost.targets[challengeId]
    const userChallengeTarget = me.challengeTargets && me.challengeTargets[challengeId]
    const challengeDefaultTarget = challenges[challengeId] && challenges[challengeId].defaultTarget
    return userTargetForDate || currentPostHasTarget || userChallengeTarget || challengeDefaultTarget
  }
  function buildUpdatePost(event) {
    return {
      ...currentPost,
      lastEditedAt: (new Date()).toString(),
      targetsMet: (
        waterTargetMet ||
        vegetableTargetMet ||
        proteinTargetMet ||
        excerciseTargetMet ||
        !carbLimitExceeded ||
        !sugarSaltLimitExceeded
      ),
      data: {
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
        challenge6: {
          quantitySugarConsumed: (event.target.quantitySugarConsumed && event.target.quantitySugarConsumed.value) || currentPost.data.challenge6.quantitySugarConsumed,
          quantitySugarConsumedUnits: (event.target.quantitySugarConsumedUnits && event.target.quantitySugarConsumedUnits.value) || currentPost.data.challenge6.quantitySugarConsumedUnits,
          quantitySaltConsumed: (event.target.quantitySaltConsumed && event.target.quantitySaltConsumed.value) || currentPost.data.challenge6.quantitySaltConsumed,
          quantitySaltConsumedUnits: (event.target.quantitySaltConsumedUnits && event.target.quantitySaltConsumedUnits.value) || currentPost.data.challenge6.quantitySaltConsumedUnits,
        },
      },
      targets: {
        challenge1: updatePostTarget('challenge1'),
        challenge2: updatePostTarget('challenge2'),
        challenge3: updatePostTarget('challenge3'),
        challenge4: updatePostTarget('challenge4'),
        challenge5: updatePostTarget('challenge5'),
        challenge6: updatePostTarget('challenge6'),
      },
    }
  }
  function onSubmitForm(event) {
    event.preventDefault()
    updateUserPost(buildUpdatePost(event))
  }
  return (
    <Container className="border border-primary rounded p-3 mt-4 mb-3 text-center">
      <h5 className='text-primary border-bottom border-primary'>{currentChallenge.challengeName}</h5>
      <h4 className='text-secondary'>{format(selectedDateInDashboard, 'P')}</h4>
      {
        currentPost ? (
          <Form onSubmit={onSubmitForm} >
            <UserDidCheckin checkedInBonus={currentPost.checkedInBonus} />
            <UserPostInputs
              currentPost={currentPost}
              challengeId={currentChallenge.uid}
              selectedDateIsToday={selectedDateIsToday}
              setWaterTargetMet={setWaterTargetMet}
              setVegetableTargetMet={setVegetableTargetMet}
              setProteinTargetMet={setProteinTargetMet}
              setExcerciseTargetMet={setExcerciseTargetMet}
              setCarbLimitExceeded={setCarbLimitExceeded}
              setSugarSaltLimitExceeded={setSugarSaltLimitExceeded}
            />
            <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
          </Form>
        )
          : null
      }
    </Container>
  )
}