import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function ProteinChallengeInputs({ proteinConsumed, proteinConsumedUnits }) {
    return (
        <>
            <InputGroup className='mb-2'>
                <Label for="proteinConsumed" hidden>Quantity</Label>
                <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                <Input name="proteinConsumed" type="number" defaultValue={proteinConsumed} />
            </InputGroup>
            <InputGroup size="sm">
                <Label for="proteinConsumedUnits" hidden>Units</Label>
                <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                <Input
                    disabled
                    bsSize='sm'
                    type="select"
                    name="proteinConsumedUnits"
                    defaultValue={proteinConsumedUnits}
                >
                    <option value="grams">grams</option>
                </Input>
            </InputGroup>
        </>
    )
}