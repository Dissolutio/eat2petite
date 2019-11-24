import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import { AppearingSubmitButton, ProgressMsg } from './ChallengePost'

export default function VegetableChallengeInputs(props) {
    const [servingsVegetablesEaten, setServingsVegetablesEaten] = useState()
    const { currentPost } = props
    const selectedDate = new Date(props.selectedDate)
    const challengeId = 'challenge2'
    const formIsDirty = (servingsVegetablesEaten && (servingsVegetablesEaten !== currentPost.data[challengeId].servingsVegetablesEaten))
    const goal = currentPost.targets[challengeId].servingsVegetablesEaten
    const score = currentPost.data[challengeId].servingsVegetablesEaten
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetGoal = score >= goal
    function handleServingsVegetablesEaten(event) {
        const newValue = event.target.value
        if (newValue) {
            setServingsVegetablesEaten(newValue)
        }
    }
    return (
        <>
            {isToday(selectedDate) ?
                (<p className='text-secondary'>How many servings of vegetables have you eaten today?</p>)
                :
                (<p className='text-secondary'>How many servings of vegetables did you eat that day?</p>)
            }
            <span style={{ display: 'block' }} className='text-info'>
                {`Your goal: ${currentPost.targets[challengeId].servingsVegetablesEaten} servings`}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal}
            />
            <fieldset >
                <InputGroup className='mb-2'>
                    <Label for="servingsVegetablesEaten" hidden />
                    <InputGroupAddon addonType="prepend">Servings Vegetables Eaten</InputGroupAddon>
                    <Input name="servingsVegetablesEaten" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].servingsVegetablesEaten) || '0'}
                        onChange={handleServingsVegetablesEaten}
                    />
                </InputGroup>
            </fieldset>
            <AppearingSubmitButton formIsDirty={formIsDirty} />
        </>
    )
}