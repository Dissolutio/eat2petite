import React from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import useFormAlert from '../../../modules/hooks/useFormAlert'

export const UserWaterTargetForm = (props) => {
    const { challenge, target, user } = props
    const { updateUserChallengeTarget } = useDataContext()
    const { fireAlert, CurrentAlertDisplay } = useFormAlert()
    const submitForm = (event) => {
        event.preventDefault()
        const newTarget = { quantityDrank: event.target.quantityDrank.value, quantityDrankUnits: event.target.quantityDrankUnits.value }
        updateUserChallengeTarget(user.uid, challenge.uid, newTarget).then(() => {
            fireAlert({ text: 'Water target updated!', color: 'success' })
        })
    }
    const Explanation = () => {
        if (target) {
            return (<p>
                This user's daily target is set to:
                <span className='text-info'>
                    {` ${target.quantityDrank} ${target.quantityDrankUnits}`}
                </span>
            </p>)
        } else {
            return (<p>
                No target set for user, using default:
            <span className='text-info'>
                    {` ${challenge.defaultTarget.quantityDrank} ${challenge.defaultTarget.quantityDrankUnits}`}
                </span>
            </p>)
        }
    }
    return (
        <Form onSubmit={submitForm} className='border border-primary border-rounded m-2 p-2'>
            <h6>Water Challenge Target</h6>
            <Explanation />
            <CurrentAlertDisplay />
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="quantityDrank">Quantity</Label>
                        <Input name="quantityDrank" type="number" defaultValue={target.quantityDrank} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="quantityDrankUnits">Units</Label>
                        <Input name="quantityDrankUnits" type="select" defaultValue={target.quantityDrankUnits}>
                            <option>ounces</option>
                            <option>cups</option>
                            <option>liters</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Button type='submit'>Update Targets</Button>
        </Form>
    )
}