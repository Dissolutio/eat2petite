import React from 'react'
import { Container, Form, FormGroup, Button } from 'reactstrap'

import { useRealtimeDataContext } from 'contexts'
import { useFormAlert } from 'hooks'

import {
  WaterChallengeInputs,
  VegetableChallengeInputs,
  ProteinChallengeInputs,
  ExcerciseChallengeInputs,
  CarbChallengeInputs,
  SugarSaltChallengeInputs,
} from 'components'

import { flatten, buildNewTargetsFromEvent } from 'helpers'

export default function EditUserDefaultTargetForm(props) {
  const { user, challenges } = props
  const { updateUserDefaultTargets } = useRealtimeDataContext()
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
  const defaultFormTargets = userDefaultTargets ? flatten(userDefaultTargets) : flatten(challengeDefaultTargets)
  const submitForm = (event) => {
    event.preventDefault()
    const newTargets = buildNewTargetsFromEvent(event)
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
      <Form onSubmit={submitForm} className='text-left'>
        <h5 className='p-2 m-2'>{`${user.firstName}'s default targets`}</h5>
        <CurrentAlertDisplay />
        <FormGroup>
          <h6>Water Challenge</h6>
          <WaterChallengeInputs defaultValues={defaultFormTargets} />
        </FormGroup>
        <FormGroup>
          <h6>Vegetable Challenge</h6>
          <VegetableChallengeInputs defaultValues={defaultFormTargets} />
        </FormGroup>
        <FormGroup>
          <h6>Protein Challenge</h6>
          <ProteinChallengeInputs defaultValues={defaultFormTargets} />
        </FormGroup>
        <FormGroup>
          <h6>Excercise Challenge</h6>
          <ExcerciseChallengeInputs defaultValues={defaultFormTargets} />
        </FormGroup>
        <h6>Carb Challenge</h6>
        <CarbChallengeInputs defaultValues={defaultFormTargets} />
        <FormGroup>
          <h6>Sugar/Salt Challenge</h6>
          <SugarSaltChallengeInputs defaultValues={defaultFormTargets} />
        </FormGroup>
        <Button type='submit'>Update target!</Button>
      </Form>
    )
  } else {
    return <Container>No User Found</Container>
  }
}
