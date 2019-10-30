import React from 'react'
import { Container, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'

function UserChallengeTargetsForm(props) {
    const [formFeedback, setFormFeedback] = React.useState('')
    const { user, challenges } = props
    const { updateUserChallengeTarget } = useDataContext()

    const waterChallenge = challengesArray.filter(challenge => challenge.challengeName === "Water Intake")[0]
    const waterTarget = (user.challengeTargets && user.challengeTargets[waterChallenge.uid]) || (waterChallenge.defaultTarget)

    const submitForm = (event) => {
        event.preventDefault()
        const newTarget = { quantity: event.target.waterQuantity.value, units: event.target.waterUnits.value }
        console.log('newTarget', newTarget)
        updateUserChallengeTarget(user.uid, waterChallenge.uid, newTarget).then(() => {
            setFormFeedback('Water target updated!')
            loadFirebaseData()
        })
    }
    const FormAlert = () => {
        setTimeout(() => {
            setFormFeedback('')
        }, 2000);
        return (formFeedback ? <Alert color='success'>{formFeedback}</Alert> : null)
    }

    return (
        (user && (
            <Container key={user.uid}>
                <Form onSubmit={submitForm}>
                    <h3>Challenge Targets</h3>
                    <Container>
                        <h4>Water Challenge Target</h4>
                        <FormAlert></FormAlert>
                        <FormGroup>
                            <Label for="waterQuantity">Quantity</Label>
                            <Input name="waterQuantity" type="number" defaultValue={waterTarget.quantity} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="waterUnits">Units</Label>
                            <Input name="waterUnits" type="select" defaultValue={waterTarget.units}>
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
