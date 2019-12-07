import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import useInputValue from '../../../modules/hooks/useInputValue'

export default function CarbChallengeInputs({ defaultValues }) {
    const refinedCarbsConsumed = useInputValue(defaultValues.refinedCarbsConsumed)
    const [refinedCarbsConsumedUnits, setRefinedCarbsConsumedUnits] = useState(defaultValues.refinedCarbsConsumedUnits)
    const handleUnitsChange = (event) => {
        setRefinedCarbsConsumedUnits(event.target)
    }
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
                    value={refinedCarbsConsumedUnits}
                    onChange={handleUnitsChange}
                >
                    <option value="calories">calories</option>
                </Input>
            </InputGroup>
        </>
    )
}