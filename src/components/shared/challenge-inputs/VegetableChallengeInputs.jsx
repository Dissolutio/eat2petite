import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function VegetableChallengeInputs({ servingsVegetablesEaten }) {

    return (
        <InputGroup className='mb-2'>
            <Label for="servingsVegetablesEaten" hidden />
            <InputGroupAddon addonType="prepend">Servings:</InputGroupAddon>
            <Input
                name="servingsVegetablesEaten"
                type="number"
                defaultValue={servingsVegetablesEaten}
            />
        </InputGroup>
    )
}