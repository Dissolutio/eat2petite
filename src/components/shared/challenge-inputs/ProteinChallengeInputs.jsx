import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import useInputValue from '../../../modules/hooks/useInputValue'

export default function ProteinChallengeInputs({ defaultValues }) {
    const proteinConsumed = useInputValue(defaultValues.proteinConsumed)
    const [proteinConsumedUnits, setProteinConsumedUnits] = useState(defaultValues.proteinConsumedUnits)
    const handleUnitsChange = (event) => {
        setProteinConsumedUnits(event.target)
    }
    return (
        <>
            <InputGroup className='mb-2'>
                <Label for="proteinConsumed" hidden>Quantity</Label>
                <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                <Input name="proteinConsumed" type="number" {...proteinConsumed} />
            </InputGroup>
            <InputGroup size="sm">
                <Label for="proteinConsumedUnits" hidden>Units</Label>
                <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                <Input
                    disabled
                    bsSize='sm'
                    type="select"
                    name="proteinConsumedUnits"
                    value={proteinConsumedUnits}
                    onChange={handleUnitsChange}
                >
                    <option value="cups">grams</option>
                    <option value="ounces">servings</option>
                </Input>
            </InputGroup>
        </>
    )
}