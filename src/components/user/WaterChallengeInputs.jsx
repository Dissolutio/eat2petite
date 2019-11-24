import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import { AppearingSubmitButton, ProgressMsg } from './ChallengePost'

export default function WaterChallengeInputs(props) {
    const [quantityWaterDrank, setQuantityDrank] = useState(0)
    const [quantityWaterDrankUnits, setQuantityDrankUnits] = useState('cups')
    const challengeId = 'challenge1'
    const { currentPost } = props
    const selectedDate = new Date(props.selectedDate)
    const formIsDirty = (quantityWaterDrank && (quantityWaterDrank !== currentPost.data[challengeId].quantityWaterDrank))
    const goal = currentPost.targets[challengeId].quantityWaterDrank
    const score = currentPost.data[challengeId].quantityWaterDrank
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetGoal = score >= goal
    function handleQuantityDrankInput(event) {
        const newValue = event.target.value
        if (newValue) {
            setQuantityDrank(newValue)
        }
    }
    function handleQuantityDrankUnitsChange(event) {
        setQuantityDrankUnits(event.target.value)
    }
    return (
        <>
            {isToday(selectedDate) ?
                (<p className='text-secondary'>How much water have you drank today?</p>)
                :
                (<p className='text-secondary'>How much water did you drink this day?</p>)}
            <span style={{ display: 'block' }} className='text-info'>
                Your goal: {currentPost.targets[challengeId].quantityWaterDrank} {currentPost.targets[challengeId].quantityWaterDrankUnits}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal}
            />
            <fieldset >
                <InputGroup className='mb-2'>
                    <Label for="quantityWaterDrank" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="quantityWaterDrank" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].quantityWaterDrank) || '0'}
                        onChange={handleQuantityDrankInput}
                    />
                </InputGroup>
                <InputGroup size="sm">
                    <Label for="quantityWaterDrankUnits" hidden>Units</Label>
                    <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                    <Input type="select" name="quantityWaterDrankUnits" disabled value={quantityWaterDrankUnits} onChange={handleQuantityDrankUnitsChange} bsSize='sm'>
                        <option value="cups">Cups</option>
                        <option value="ounces">Ounces</option>
                        <option value="liters">Liters</option>
                    </Input>
                </InputGroup>
            </fieldset>
            <AppearingSubmitButton formIsDirty={formIsDirty} />
        </>
    )
}