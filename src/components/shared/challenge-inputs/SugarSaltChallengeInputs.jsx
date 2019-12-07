import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import useInputValue from '../../../modules/hooks/useInputValue'

export default function SugarSaltChallengeInputs({ defaultValues }) {
    const quantitySugarConsumed = useInputValue(defaultValues.quantitySugarConsumed)
    const quantitySaltConsumed = useInputValue(defaultValues.quantitySaltConsumed)
    const [quantitySugarConsumedUnits, setQuantitySugarConsumedUnits] = useState(defaultValues.quantitySugarConsumedUnits)
    const [quantitySaltConsumedUnits, setQuantitySaltConsumedUnits] = useState(defaultValues.quantitySaltConsumedUnits)
    const handleSugarUnitsChange = (event) => {
        setQuantitySugarConsumedUnits(event.target)
    }
    const handleSaltUnitsChange = (event) => {
        setQuantitySaltConsumedUnits(event.target)
    }
    return (
        <>
            <InputGroup className='mb-2'>
                <Label for="quantitySugarConsumed" hidden>Sugar quantity</Label>
                <InputGroupAddon addonType="prepend">Sugar</InputGroupAddon>
                <Input name="quantitySugarConsumed" type="number" {...quantitySugarConsumed} />
            </InputGroup>
            <InputGroup size="sm" className='mb-2'>
                <Label for="quantitySugarConsumedUnits" hidden>sugar units</Label>
                <InputGroupAddon addonType="prepend" >Units:</InputGroupAddon>
                <Input
                    disabled
                    bsSize='sm'
                    type="select"
                    name="quantitySugarConsumedUnits"
                    value={quantitySugarConsumedUnits}
                    onChange={handleSugarUnitsChange}
                >
                    <option value="grams">grams</option>
                    <option value="teaspoons">teaspoons</option>
                    <option value="tablespoons">tablespoons</option>
                </Input>
            </InputGroup>
            <InputGroup className='mb-2'>
                <Label for="quantitySaltConsumed" hidden>Salt quantity</Label>
                <InputGroupAddon addonType="prepend">Salt</InputGroupAddon>
                <Input name="quantitySaltConsumed" type="number" {...quantitySaltConsumed} />
            </InputGroup>
            <InputGroup size="sm" className='mb-2'>
                <Label for="quantitySaltConsumedUnits" hidden>salt units</Label>
                <InputGroupAddon addonType="prepend">Units:</InputGroupAddon>
                <Input
                    disabled
                    bsSize='sm'
                    type="select"
                    name="quantitySaltConsumedUnits"
                    value={quantitySaltConsumedUnits}
                    onChange={handleSaltUnitsChange}
                >
                    <option value="grams">grams</option>
                    <option value="teaspoons">teaspoons</option>
                    <option value="tablespoons">tablespoons</option>
                </Input>
            </InputGroup>
        </>
    )
}
