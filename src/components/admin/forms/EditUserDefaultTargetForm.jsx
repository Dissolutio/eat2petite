import React from 'react'
import { Container, Form, Button } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import useFormAlert from '../../../modules/hooks/useFormAlert'

import WaterChallengeInputs from '../../shared/challenge-inputs/WaterChallengeInputs'

function EditUserDefaultTargetForm(props) {
    const { user, challenges } = props
    const { updateUserDefaultTargets } = useDataContext()
    const { fireAlert, CurrentAlertDisplay } = useFormAlert()

    const userDefaultTargets = user.defaultTargets
    const challengeDefaultTargets = Object.values(challenges).reduce((result, challenge) => {
        const challengeId = challenge.uid
        return {
            ...result,
            [challengeId]: challenges[challengeId].defaultTarget,
        }
    }, {})
    const defaultFormTargets = userDefaultTargets ? userDefaultTargets : challengeDefaultTargets
    const submitForm = (event) => {
        event.preventDefault()
        const newTargets = {
            ...defaultFormTargets,
            'challenge1': {
                quantityWaterDrank: parseInt(event.target.quantityWaterDrank.value),
                quantityWaterDrankUnits: event.target.quantityWaterDrankUnits.value,
            },
        }
        console.log("TCL: submitForm -> newTargets", newTargets)
        updateUserDefaultTargets(user.uid, newTargets)
            .then(() => {
                fireAlert({ text: `${user.firstName}'s default targets were updated!`, color: 'success' })
            })
            .catch(error => {
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
                <Button type='submit'>Update target!</Button>
            </Form>
        )
    } else {
        return <Container>No User Found</Container>
    }
}
export default EditUserDefaultTargetForm

