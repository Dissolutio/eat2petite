import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import { AppearingSubmitButton, ProgressMsg } from './ChallengePost'

export default function ProteinChallengeInputs(props) {
    const [proteinConsumed, setProteinConsumed] = useState(0)
    const [proteinConsumedUnits, setProteinConsumedUnits] = useState('grams')
    const challengeId = 'challenge3'
    const { currentPost } = props
    const selectedDate = new Date(props.selectedDate)
    const formIsDirty = proteinConsumed && (proteinConsumed !== currentPost.data[challengeId].proteinConsumed)
    const goal = currentPost.targets[challengeId].proteinConsumed
    const score = currentPost.data[challengeId].proteinConsumed
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetGoal = score >= goal
    function handleProteinConsumed(event) {
        const newValue = event.target.value
        if (newValue) {
            setProteinConsumed(newValue)
        }
    }
    function handleProteinConsumedUnits(event) {
        const newValue = event.target.value
        if (newValue) {
            setProteinConsumedUnits(event.target.value)
        }
    }
    return (
        <>
            {isToday(selectedDate) ?
                (<p className='text-secondary'>How much water have you drank today?</p>)
                :
                (<p className='text-secondary'>How much water did you drink this day?</p>)}
            <span style={{ display: 'block' }} className='text-info'>
                Your goal: {currentPost.targets[challengeId].quantityWaterDrank} {currentPost.targets[challengeId].proteinConsumedUnits}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal}
            />
            <fieldset >
                <InputGroup className='mb-2'>
                    <Label for="proteinConsumed" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="proteinConsumed" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].proteinConsumed) || '0'}
                        onChange={handleProteinConsumed}
                    />
                </InputGroup>
                <InputGroup size="sm">
                    <Label for="proteinConsumedUnits" hidden>Units</Label>
                    <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                    <Input type="select" name="proteinConsumedUnits" disabled value={proteinConsumedUnits} onChange={handleProteinConsumedUnits} bsSize='sm'>
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