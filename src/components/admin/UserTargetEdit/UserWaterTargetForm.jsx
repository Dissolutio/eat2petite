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
        const newTarget = { quantityWaterDrank: event.target.quantityWaterDrank.value, quantityWaterDrankUnits: event.target.quantityWaterDrankUnits.value }
        updateUserChallengeTarget(user.uid, challenge.uid, newTarget).then(() => {
            fireAlert({ text: 'Water target updated!', color: 'success' })
        })
    }
    const currentTarget = (params) => {
        const quantity = userTarget ? userTarget.quantityWaterDrank : challenge.defaultTarget.quantityWaterDrank
        const units = userTarget ? userTarget.quantityWaterDrankUnits : challenge.defaultTarget.quantityWaterDrankUnits
        return { quantity, units }
    }
    return (
        <Form onSubmit={submitForm} className='border border-primary border-rounded m-2 p-2'>
            <h6>Water Challenge Target</h6>
            <CurrentAlertDisplay />
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="quantityWaterDrank">Quantity</Label>
                        <Input name="quantityWaterDrank" type="number" defaultValue={currentTarget().quantity} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="quantityWaterDrankUnits">Units</Label>
                        <Input name="quantityWaterDrankUnits" type="select" disabled defaultValue={currentTarget().units}>
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