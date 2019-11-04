import React from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import { useDataContext } from '../../../contexts/useDataContext'
import useFormAlert from '../../../modules/hooks/useFormAlert'

export const UserWaterTargetForm = (props) => {
    const { challenge, userTarget, user } = props
    const { updateUserChallengeTarget } = useDataContext()
    const { fireAlert, CurrentAlertDisplay } = useFormAlert()
    if (challenge.uid !== 'challenge1') { return null }
    const submitForm = (event) => {
        event.preventDefault()
        const newTarget = { quantityDrank: event.target.quantityDrank.value, quantityDrankUnits: event.target.quantityDrankUnits.value }
        updateUserChallengeTarget(user.uid, challenge.uid, newTarget).then(() => {
            fireAlert({ text: 'Water target updated!', color: 'success' })
        })
    }
    const currentTarget = (params) => {
        const quantity = userTarget ? userTarget.quantityDrank : challenge.defaultTarget.quantityDrank
        const units = userTarget ? userTarget.quantityDrankUnits : challenge.defaultTarget.quantityDrankUnits
        return { quantity, units }
    }
    return (
        <Form onSubmit={submitForm} className='border border-primary border-rounded m-2 p-2'>
            <h6>Water Challenge Target</h6>
            <CurrentAlertDisplay />
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="quantityDrank">Quantity</Label>
                        <Input name="quantityDrank" type="number" defaultValue={currentTarget().quantity} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="quantityDrankUnits">Units</Label>
                        <Input name="quantityDrankUnits" type="select" disabled defaultValue={currentTarget().units}>
                            <option>ounces</option>
                            <option>cups</option>
                            <option>liters</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Button type='submit'>Update target!</Button>
        </Form>
    )
}