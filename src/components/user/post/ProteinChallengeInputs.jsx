import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import AppearingSubmitButton from './AppearingSubmitButton'
import ProgressMsg from './ProgressMsg'

export default function ProteinChallengeInputs(props) {
    const [proteinConsumed, setProteinConsumed] = useState(0)
    const challengeId = 'challenge3'
    const { currentPost, proteinTargetMet, setProteinTargetMet } = props
    const selectedDate = new Date(props.selectedDate)
    const formIsDirty = proteinConsumed && (proteinConsumed !== currentPost.data[challengeId].proteinConsumed)
    const goal = currentPost.targets[challengeId].proteinConsumed
    const score = proteinConsumed || currentPost.data[challengeId].proteinConsumed
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetGoal = () => {
        if (score >= goal) {
            setProteinTargetMet(true)
            return true
        } else return false
    }
    function handleProteinConsumed(event) {
        const newValue = event.target.value
        if (newValue) {
            setProteinConsumed(newValue)
        }
    }
    const MessageForDay = ({ isToday }) => {
        if (isToday) {
            return (<p className='text-secondary'>How many grams of protein did you eat today?</p>)
        } else {
            return (<p className='text-secondary'>How many grams of protein did you eat that day?</p>)
        }
    }
    const GoalReadout = ({ proteinConsumed, proteinConsumedUnits = 'grams' }) => {
        if (!proteinConsumed) { return null }
        return (
            <span style={{ display: 'block' }} className='text-info'>
                Your goal: {currentPost.targets[challengeId].proteinConsumed} {currentPost.targets[challengeId].proteinConsumedUnits}
            </span>
        )
    }


    return (
        <>
            <MessageForDay
                isToday={isToday(selectedDate)}
            />
            <GoalReadout
                proteinConsumed={currentPost.targets[challengeId].proteinConsumed}
                proteinConsumedUnits={undefined}
            />
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal()}
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
            </fieldset>
            <AppearingSubmitButton formIsDirty={formIsDirty} />
        </>
    )
}