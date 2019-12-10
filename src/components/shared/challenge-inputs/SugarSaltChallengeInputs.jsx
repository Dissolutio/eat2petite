import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function SugarSaltChallengeInputs({ quantitySugarConsumed, quantitySaltConsumed, quantitySugarConsumedUnits, quantitySaltConsumedUnits }) {
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
                    {...quantitySugarConsumedUnits}
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
                    {...quantitySaltConsumedUnits}
                >
                    <option value="grams">grams</option>
                    <option value="teaspoons">teaspoons</option>
                    <option value="tablespoons">tablespoons</option>
                </Input>
            </InputGroup>
        </>
    )
}
