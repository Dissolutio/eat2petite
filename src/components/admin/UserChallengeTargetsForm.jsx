import React from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import useFormAlert from '../../modules/hooks/useFormAlert'

function UserChallengeTargetsForm(props) {
    const { user, challenges } = props
    const { updateUserChallengeTarget } = useDataContext()
    const { fireAlert, CurrentAlertDisplay } = useFormAlert()

    const waterChallenge = challenges['challenge1']
    const waterTarget = (user.challengeTargets && user.challengeTargets[waterChallenge.uid]) || (waterChallenge.defaultTarget)

    const submitForm = (event) => {
        event.preventDefault()
        const newTarget = { quantityDrank: event.target.quantityDrank.value, quantityDrankUnits: event.target.quantityDrankUnits.value }
        updateUserChallengeTarget(user.uid, waterChallenge.uid, newTarget).then(() => {
            fireAlert({ text: 'Water target updated!', color: 'info' })
        })
    }

    return (
        (user && (
            <Container key={user.uid}>
                <Form onSubmit={submitForm}>
                    <h3>Challenge Targets</h3>
                    <Container>
                        <h4>Water Challenge Target</h4>
                        <CurrentAlertDisplay />
                        <FormGroup>
                            <Label for="quantityDrank">Quantity</Label>
                            <Input name="quantityDrank" type="number" defaultValue={waterTarget.quantityDrank} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantityDrankUnits">Units</Label>
                            <Input name="quantityDrankUnits" type="select" defaultValue={waterTarget.quantityDrankUnits}>
                                <option>ounces</option>
                                <option>cups</option>
                                <option>liters</option>
                            </Input>
                        </FormGroup>
                    </Container>
                    <Button type='submit'>Update Targets</Button>
                </Form>
            </Container>
        )) || <Container>No User Found</Container>
    )
}

export default UserChallengeTargetsForm
