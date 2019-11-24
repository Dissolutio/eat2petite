import React, { useState } from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import { AppearingSubmitButton, ProgressMsg } from './ChallengePost'

export default function WaterChallengeInputs(props) {
    const [lightExcerciseDuration, setLightExcerciseDuration] = useState(0)
    const [mediumExcerciseDuration, setMediumExcerciseDuration] = useState(0)
    const [heavyExcerciseDuration, setHeavyExcerciseDuration] = useState(0)
    const challengeId = 'challenge1'
    const { currentPost } = props
    const selectedDate = new Date(props.selectedDate)
    const formIsDirty = ((lightExcerciseDuration && (lightExcerciseDuration !== currentPost.data[challengeId].lightExcerciseDuration))
        || (mediumExcerciseDuration && (mediumExcerciseDuration !== currentPost.data[challengeId].mediumExcerciseDuration))
        || (heavyExcerciseDuration && (heavyExcerciseDuration !== currentPost.data[challengeId].heavyExcerciseDuration)))
    const lightGoal = currentPost.targets[challengeId].quantityWaterDrank
    const lightScore = currentPost.data[challengeId].quantityWaterDrank
    const mediumGoal = currentPost.targets[challengeId].quantityWaterDrank
    const mediumScore = currentPost.data[challengeId].quantityWaterDrank
    const heavyGoal = currentPost.targets[challengeId].quantityWaterDrank
    const heavyScore = currentPost.data[challengeId].quantityWaterDrank
    const userProgressingTowardsGoal = ((lightScore > 0 || mediumScore > 0 || heavyScore > 0) && ((lightScore < lightGoal) && (mediumScore < mediumGoal) && (heavyScore < heavyGoal)))
    const userMetGoal = ((lightScore >= lightGoal) && (mediumScore >= mediumGoal) && (heavyScore >= heavyGoal))
    function handleLightExcerciseDuration(event) {
        const newValue = event.target.value
        if (newValue) {
            setLightExcerciseDuration(newValue)
        }
    }
    function handleMediumExcerciseDuration(event) {
        const newValue = event.target.value
        if (newValue) {
            setMediumExcerciseDuration(newValue)
        }
    }
    function handleHeavyExcerciseDuration(event) {
        const newValue = event.target.value
        if (newValue) {
            setHeavyExcerciseDuration(newValue)
        }
    }
    return (
        <>
            {isToday(selectedDate) ?
                (<p className='text-secondary'>How much excercise have you done today?</p>)
                :
                (<p className='text-secondary'>How much excercise did you do this day?</p>)}
            <span style={{ display: 'block' }} className='text-info'>
                Your goals:
            </span>
            <span style={{ display: 'block' }} className='text-info'>
                {currentPost.targets[challengeId].lightExcerciseDuration} minutes light excercise
            </span>
            <span style={{ display: 'block' }} className='text-info'>
                {currentPost.targets[challengeId].mediumExcerciseDuration} minutes medium excercise
            </span>
            <span style={{ display: 'block' }} className='text-info'>
                {currentPost.targets[challengeId].heavyExcerciseDuration} minutes heavy excercise
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal}
            />
            <fieldset >
                <InputGroup className='mb-2'>
                    <Label for="lightExcerciseDuration" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="lightExcerciseDuration" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].lightExcerciseDuration) || '0'}
                        onChange={handleLightExcerciseDuration}
                    />
                </InputGroup>
                <InputGroup className='mb-2'>
                    <Label for="mediumExcerciseDuration" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="mediumExcerciseDuration" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].mediumExcerciseDuration) || '0'}
                        onChange={handleMediumExcerciseDuration}
                    />
                </InputGroup>
                <InputGroup className='mb-2'>
                    <Label for="heavyExcerciseDuration" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="heavyExcerciseDuration" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].heavyExcerciseDuration) || '0'}
                        onChange={handleHeavyExcerciseDuration}
                    />
                </InputGroup>
            </fieldset>
            <AppearingSubmitButton formIsDirty={formIsDirty} />
        </>
    )
}