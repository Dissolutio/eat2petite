import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import useInputValue from '../../../modules/hooks/useInputValue'

export default function VegetableChallengeInputs({ defaultValues }) {
    const servingsVegetablesEaten = useInputValue(defaultValues.servingsVegetablesEaten)
    return (
        <InputGroup className='mb-2'>
            <Label for="servingsVegetablesEaten" hidden />
            <InputGroupAddon addonType="prepend">Servings:</InputGroupAddon>
            <Input
                name="servingsVegetablesEaten"
                type="number"
                {...servingsVegetablesEaten}
            />
        </InputGroup>
    )
}