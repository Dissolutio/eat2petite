import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function CarbChallengeInputs({ refinedCarbsConsumed, refinedCarbsConsumedUnits }) {
    return (
        <>
            <InputGroup className='mb-2'>
                <Label for="refinedCarbsConsumed" hidden>Quantity</Label>
                <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                <Input name="refinedCarbsConsumed" type="number" {...refinedCarbsConsumed} />
            </InputGroup>
            <InputGroup size="sm">
                <Label for="refinedCarbsConsumedUnits" hidden>Units</Label>
                <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                <Input
                    disabled
                    bsSize='sm'
                    type="select"
                    name="refinedCarbsConsumedUnits"
                    {...refinedCarbsConsumedUnits}
                >
                    <option value="calories">calories</option>
                </Input>
            </InputGroup>
        </>
    )
}