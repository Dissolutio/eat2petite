import React from 'react'
import { Container, Form, Button } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import useFormAlert from '../../../modules/hooks/useFormAlert'

import WaterChallengeInputs from '../../shared/challenge-inputs/WaterChallengeInputs'
import VegetableChallengeInputs from '../../shared/challenge-inputs/VegetableChallengeInputs'
import ProteinChallengeInputs from '../../shared/challenge-inputs/ProteinChallengeInputs'
import ExcerciseChallengeInputs from '../../shared/challenge-inputs/ExcerciseChallengeInputs'
import CarbChallengeInputs from '../../shared/challenge-inputs/CarbChallengeInputs'
import SugarSaltChallengeInputs from '../../shared/challenge-inputs/SugarSaltChallengeInputs'

function EditUserDefaultTargetForm(props) {
  const { user, challenges } = props
  const { updateUserDefaultTargets } = useDataContext()
  const { fireAlert, CurrentAlertDisplay } = useFormAlert()

  const userDefaultTargets = user.defaultTargets
  const challengeDefaultTargets = Object.values(challenges).reduce(
    (result, challenge) => {
      const challengeId = challenge.uid
      return {
        ...result,
        [challengeId]: challenges[challengeId].defaultTarget,
      }
    },
    {},
  )
  const defaultFormTargets = userDefaultTargets
    ? userDefaultTargets
    : challengeDefaultTargets
  console.log(
    'TCL: EditUserDefaultTargetForm -> defaultFormTargets',
    defaultFormTargets,
  )
  const submitForm = (event) => {
    event.preventDefault()
    const newTargets = {
      ...defaultFormTargets,
      challenge1: {
        quantityWaterDrank:
          event.target.quantityWaterDrank &&
          event.target.quantityWaterDrank.value,
        quantityWaterDrankUnits:
          event.target.quantityWaterDrankUnits &&
          event.target.quantityWaterDrankUnits.value,
      },
      challenge2: {
        servingsVegetablesEaten:
          event.target.servingsVegetablesEaten &&
          event.target.servingsVegetablesEaten.value,
      },
      challenge3: {
        proteinConsumed:
          event.target.proteinConsumed && event.target.proteinConsumed.value,
      },
      challenge4: {
        lightExcerciseDuration:
          event.target.lightExcerciseDuration &&
          event.target.lightExcerciseDuration.value,
        mediumExcerciseDuration:
          event.target.mediumExcerciseDuration &&
          event.target.mediumExcerciseDuration.value,
        heavyExcerciseDuration:
          event.target.heavyExcerciseDuration &&
          event.target.heavyExcerciseDuration.value,
      },
      challenge5: {
        refinedCarbsConsumed:
          event.target.refinedCarbsConsumed &&
          event.target.refinedCarbsConsumed.value,
      },
      challenge6: {
        quantitySugarConsumed:
          event.target.quantitySugarConsumed &&
          event.target.quantitySugarConsumed.value,
        quantitySugarConsumedUnits:
          event.target.quantitySugarConsumedUnits &&
          event.target.quantitySugarConsumedUnits.value,
        quantitySaltConsumed:
          event.target.quantitySaltConsumed &&
          event.target.quantitySaltConsumed.value,
        quantitySaltConsumedUnits:
          event.target.quantitySaltConsumedUnits &&
          event.target.quantitySaltConsumedUnits.value,
      },
    }
    updateUserDefaultTargets(user.uid, newTargets)
      .then(() => {
        fireAlert({
          text: `${user.firstName}'s default targets were updated!`,
          color: 'success',
        })
      })
      .catch((error) => {
        console.log(error)
        fireAlert({ text: `Failed to update!`, color: 'danger' })
      })
  }
  if (user) {
    return (
      <Form onSubmit={submitForm}>
        <h5 className='p-2 m-2'>{`${user.firstName}'s default targets`}</h5>
        <CurrentAlertDisplay />
        <h4>Water Challenge</h4>
        <WaterChallengeInputs defaultValues={defaultFormTargets} />
        <h4>Vegetable Challenge</h4>
        <VegetableChallengeInputs defaultValues={defaultFormTargets} />
        <h4>Protein Challenge</h4>
        <ProteinChallengeInputs defaultValues={defaultFormTargets} />
        <h4>Excercise Challenge</h4>
        <ExcerciseChallengeInputs defaultValues={defaultFormTargets} />
        <h4>Carb Challenge</h4>
        <CarbChallengeInputs defaultValues={defaultFormTargets} />
        <h4>Sugar/Salt Challenge</h4>
        <SugarSaltChallengeInputs defaultValues={defaultFormTargets} />
        <Button type='submit'>Update target!</Button>
      </Form>
    )
  } else {
    return <Container>No User Found</Container>
  }
}
export default EditUserDefaultTargetForm
