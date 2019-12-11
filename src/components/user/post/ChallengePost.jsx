import React from 'react'
import { Container, Form } from 'reactstrap'
import { format, differenceInCalendarDays, isToday } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'

import UserPostInputs from './UserPostInputs'
import UserDidCheckin from '../../shared/UserDidCheckin'
import LastEditedReadout from './LastEditedReadout'

import useInputValue from 'modules/hooks/useInputValue'
import { scorePost } from 'modules/functions'

export default function ChallengePost(props) {
  const {
    userSelectedContest,
    selectedDateInDashboard,
    me,
    currentChallenge,
    currentPost,
    challenges,
  } = props
  const { saveNewPost, updateUserPost } = useDataContext()
  // Make form state
  const quantityWaterDrank = useInputValue('0')
  const quantityWaterDrankUnits = useInputValue('cups')
  const servingsVegetablesEaten = useInputValue('0')
  const proteinConsumed = useInputValue('0')
  const proteinConsumedUnits = useInputValue('grams')
  const lightExcerciseDuration = useInputValue('0')
  const mediumExcerciseDuration = useInputValue('0')
  const heavyExcerciseDuration = useInputValue('0')
  const refinedCarbsConsumed = useInputValue('0')
  const refinedCarbsConsumedUnits = useInputValue('calories')
  const quantitySugarConsumed = useInputValue('0')
  const quantitySaltConsumed = useInputValue('0')
  const quantitySugarConsumedUnits = useInputValue('grams')
  const quantitySaltConsumedUnits = useInputValue('grams')
  const formState = {
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
  }
  React.useEffect(() => {
    // Reset Form values
    if (!(currentPost && currentPost.data)) return
    quantityWaterDrank.setInputValue(
      currentPost && currentPost.data.challenge1.quantityWaterDrank,
    )
    quantityWaterDrankUnits.setInputValue(
      currentPost && currentPost.data.challenge1.quantityWaterDrankUnits,
    )
    servingsVegetablesEaten.setInputValue(
      currentPost && currentPost.data.challenge2.servingsVegetablesEaten,
    )
    proteinConsumed.setInputValue(
      currentPost && currentPost.data.challenge3.proteinConsumed,
    )
    proteinConsumedUnits.setInputValue(
      currentPost && currentPost.data.challenge3.proteinConsumedUnits,
    )
    lightExcerciseDuration.setInputValue(
      currentPost && currentPost.data.challenge4.lightExcerciseDuration,
    )
    mediumExcerciseDuration.setInputValue(
      currentPost && currentPost.data.challenge4.mediumExcerciseDuration,
    )
    heavyExcerciseDuration.setInputValue(
      currentPost && currentPost.data.challenge4.heavyExcerciseDuration,
    )
    refinedCarbsConsumed.setInputValue(
      currentPost && currentPost.data.challenge5.refinedCarbsConsumed,
    )
    refinedCarbsConsumedUnits.setInputValue(
      currentPost && currentPost.data.challenge5.refinedCarbsConsumedUnits,
    )
    quantitySugarConsumed.setInputValue(
      currentPost && currentPost.data.challenge6.quantitySugarConsumed,
    )
    quantitySaltConsumed.setInputValue(
      currentPost && currentPost.data.challenge6.quantitySaltConsumed,
    )
    quantitySugarConsumedUnits.setInputValue(
      currentPost && currentPost.data.challenge6.quantitySugarConsumedUnits,
    )
    quantitySaltConsumedUnits.setInputValue(
      currentPost && currentPost.data.challenge6.quantitySaltConsumedUnits,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost])
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
    return {
      ...currentPost,
      lastEditedAt: new Date().toString(),
      targetsMet: false,
      data: {
        challenge1: {
          quantityWaterDrank: quantityWaterDrank.value,
          quantityWaterDrankUnits: quantityWaterDrankUnits.value,
        },
        challenge2: {
          servingsVegetablesEaten: servingsVegetablesEaten.value,
        },
        challenge3: {
          proteinConsumed: proteinConsumed.value,
          proteinConsumedUnits: proteinConsumedUnits.value,
        },
        challenge4: {
          defaultMeasurementUnits: 'minutes',
          lightExcerciseDuration: lightExcerciseDuration.value,
          mediumExcerciseDuration: mediumExcerciseDuration.value,
          heavyExcerciseDuration: heavyExcerciseDuration.value,
        },
        challenge5: {
          refinedCarbsConsumed: refinedCarbsConsumed.value,
          refinedCarbsConsumedUnits: refinedCarbsConsumedUnits.value,
        },
        challenge6: {
          quantitySugarConsumed: quantitySugarConsumed.value,
          quantitySugarConsumedUnits: quantitySugarConsumedUnits.value,
          quantitySaltConsumed: quantitySaltConsumed.value,
          quantitySaltConsumedUnits: quantitySaltConsumedUnits.value,
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
            formState={formState}
            progress={scorePost(currentPost)}
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
