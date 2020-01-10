import React from 'react'
import { Container, Form } from 'reactstrap'
import { format, differenceInCalendarDays, isToday } from 'date-fns'

import { useRealtimeDataContext } from 'contexts/useRealtimeDataContext'

import UserPostInputs from './UserPostInputs'
import UserDidCheckin from 'components/shared/UserDidCheckin'
import LastEditedReadout from './LastEditedReadout'

export default function ChallengePost(props) {
  const {
    userSelectedContest,
    selectedDateInDashboard,
    me,
    currentChallenge,
    currentPost,
    challenges,
  } = props
  const { saveNewPost, updateUserPost } = useRealtimeDataContext()
  const selectedDateIsFutureDate =
    differenceInCalendarDays(new Date(), new Date(selectedDateInDashboard)) < 0
  const selectedDateIsToday = isToday(selectedDateInDashboard)

  // TODO: Render a placeholder form under these two conditions
  if (!currentChallenge) {
    return <h5>No challenge for today!</h5>
  }
  if (!currentPost && !selectedDateIsFutureDate) {

    saveNewPost(
      selectedDateInDashboard,
      currentChallenge,
      userSelectedContest.uid,
    )
    return <h1>Creating post for selected date...</h1>
  }

  function buildUpdatePost(event, challengeId) {
    function updatePostTarget(challengeId) {
      const userTargetForDate =
        me.challengeTargetsForDates &&
        me.challengeTargetsForDates[
        `${format(selectedDateInDashboard, 'yyyy-MM-dd')}`
        ]
      const currentPostHasTarget =
        currentPost && currentPost.targets[challengeId]
      const userChallengeTarget =
        me.challengeTargets && me.challengeTargets[challengeId]
      const challengeDefaultTarget =
        challenges[challengeId] && challenges[challengeId].defaultTarget
      return (
        userTargetForDate ||
        currentPostHasTarget ||
        userChallengeTarget ||
        challengeDefaultTarget
      )
    }
    const {
      quantityWaterDrank,
      quantityWaterDrankUnits,
      servingsVegetablesEaten,
      proteinConsumed,
      proteinConsumedUnits,
      lightExcerciseDuration,
      mediumExcerciseDuration,
      heavyExcerciseDuration,
      refinedCarbsConsumed,
      refinedCarbsConsumedUnits,
      quantitySugarConsumed,
      quantitySaltConsumed,
      quantitySugarConsumedUnits,
      quantitySaltConsumedUnits,
    } = event.target
    return {
      ...currentPost,
      lastEditedAt: new Date().toString(),
      targetsMet: false,
      data: {
        challenge1: {
          quantityWaterDrank: quantityWaterDrank ? quantityWaterDrank.value : currentPost.data.challenge1.quantityWaterDrank,
          quantityWaterDrankUnits: quantityWaterDrankUnits ? quantityWaterDrankUnits.value : currentPost.data.challenge1.quantityWaterDrankUnits,
        },
        challenge2: {
          servingsVegetablesEaten: servingsVegetablesEaten ? servingsVegetablesEaten.value : currentPost.data.challenge2.servingsVegetablesEaten,
        },
        challenge3: {
          proteinConsumed: proteinConsumed ? proteinConsumed.value : currentPost.data.challenge3.proteinConsumed,
          proteinConsumedUnits: proteinConsumedUnits ? proteinConsumedUnits.value : currentPost.data.challenge3.proteinConsumedUnits,
        },
        challenge4: {
          defaultMeasurementUnits: 'minutes',
          lightExcerciseDuration: lightExcerciseDuration ? lightExcerciseDuration.value : currentPost.data.challenge4.lightExcerciseDuration,
          mediumExcerciseDuration: mediumExcerciseDuration ? mediumExcerciseDuration.value : currentPost.data.challenge4.mediumExcerciseDuration,
          heavyExcerciseDuration: heavyExcerciseDuration ? heavyExcerciseDuration.value : currentPost.data.challenge4.heavyExcerciseDuration,
        },
        challenge5: {
          refinedCarbsConsumed: refinedCarbsConsumed ? refinedCarbsConsumed.value : currentPost.data.challenge5.refinedCarbsConsumed,
          refinedCarbsConsumedUnits: refinedCarbsConsumedUnits ? refinedCarbsConsumedUnits.value : currentPost.data.challenge5.refinedCarbsConsumedUnits,
        },
        challenge6: {
          quantitySugarConsumed: quantitySugarConsumed ? quantitySugarConsumed.value : currentPost.data.challenge6.quantitySugarConsumed,
          quantitySugarConsumedUnits: quantitySugarConsumedUnits ? quantitySugarConsumedUnits.value : currentPost.data.challenge6.quantitySugarConsumedUnits,
          quantitySaltConsumed: quantitySaltConsumed ? quantitySaltConsumed.value : currentPost.data.challenge6.quantitySaltConsumed,
          quantitySaltConsumedUnits: quantitySaltConsumedUnits ? quantitySaltConsumedUnits.value : currentPost.data.challenge6.quantitySugarConsumedUnits,
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
    updateUserPost(buildUpdatePost(event, currentChallenge.uid))
  }
  return (
    <Container className='border border-primary rounded p-3 mt-4 mb-3 text-center'>
      <h6 style={{ fontFamily: 'ABeeZee, sans-serif', fontSize: '1.2rem' }}>
        {format(selectedDateInDashboard, 'P')}
      </h6>
      <h6>{currentChallenge.challengeName}</h6>
      {currentPost ? (
        <Form onSubmit={onSubmitForm}>
          <UserDidCheckin checkedInBonus={currentPost.checkedInBonus} />
          <UserPostInputs
            currentPost={currentPost}
            challengeId={currentChallenge.uid}
            selectedDateIsToday={selectedDateIsToday}
          />
          <LastEditedReadout lastEditedAt={currentPost.lastEditedAt} />
        </Form>
      ) : null}
    </Container>
  )
}
