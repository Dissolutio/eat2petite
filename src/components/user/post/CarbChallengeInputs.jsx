import React, { useState } from 'react'
import { Label, Badge, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import AppearingSubmitButton from './AppearingSubmitButton'

export default function CarbChallengeInputs(props) {
    const [refinedCarbsConsumed, setRefinedCarbsConsumed] = useState(0)
    const challengeId = 'challenge5'
    const { currentPost, carbTargetMet, setCarbTargetMet } = props
    const selectedDate = new Date(props.selectedDate)
    const formIsDirty = ((refinedCarbsConsumed && (refinedCarbsConsumed !== currentPost.data[challengeId].refinedCarbsConsumed)))
    const goalLimit = currentPost.targets[challengeId].refinedCarbsConsumed
    const score = currentPost.data[challengeId].refinedCarbsConsumed
    const userProgressingTowardsGoal = ((refinedCarbsConsumed > 0) && (score <= goalLimit))
    const condition = ((score > goalLimit))
    const userMetGoal = () => {
        if (condition) {
            setCarbTargetMet(true)
            return true
        } else return false
    }
    function handleRefinedCarbsConsumed(event) {
        const newValue = event.target.value
        if (newValue) {
            setRefinedCarbsConsumed(newValue)
        }
    }
    const GoalReadout = ({ caloriesFromCarbs }) => {
        return (
            <span style={{ display: 'block' }} className='text-info'>
                {`Goal: <= ${caloriesFromCarbs}`}
            </span>
        )
    }
    const CarbProgressMsg = ({ userProgressingTowardsGoal, userMetGoal }) => {
        if (userProgressingTowardsGoal) {
            return (
                <span style={{ display: 'block' }}>
                    <Badge color='success'>
                        Still under budget!
                </Badge>
                </span>
            )
        }
        if (userMetGoal) {
            return (
                <span style={{ display: 'block' }}>
                    <Badge color='warning'>
                        Simple carbs overload!
                    </Badge>
                </span>
            )
        } else {
            return null
        }
    }
    const MessageForDay = ({ isToday }) => {
        if (isToday) {
            return (<p className='text-secondary'>How many calories from simple carbohydrates have you consumed today?</p>)
        } else {
            return (<p className='text-secondary'>How many calories from simple carbohydrates did you consume that day?</p>)
        }
    }

    return (
        <>
            <MessageForDay
                isToday={isToday(selectedDate)}
            />
            <GoalReadout
                caloriesFromCarbs={currentPost.targets[challengeId].refinedCarbsConsumed}
            />
            <CarbProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal()}
            />
            <fieldset >
                <InputGroup className='mb-2'>
                    <Label for="refinedCarbsConsumed" hidden>Refined Carbs Consumed</Label>
                    <InputGroupAddon addonType="prepend">Refined Carbs Consumed</InputGroupAddon>
                    <Input name="refinedCarbsConsumed" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].refinedCarbsConsumed) || '0'}
                        onChange={handleRefinedCarbsConsumed}
                    />
                </InputGroup>
            </fieldset>
            <AppearingSubmitButton formIsDirty={formIsDirty} />
        </>
    )
}