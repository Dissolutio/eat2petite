import React, { useState } from 'react'
import { Container, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { isToday } from 'date-fns'
import AppearingSubmitButton from './AppearingSubmitButton'
import ProgressMsg from './ProgressMsg'

export default function ExcerciseChallengeInputs(props) {
    const [lightExcerciseDuration, setLightExcerciseDuration] = useState(0)
    const [mediumExcerciseDuration, setMediumExcerciseDuration] = useState(0)
    const [heavyExcerciseDuration, setHeavyExcerciseDuration] = useState(0)
    const challengeId = 'challenge4'
    const { currentPost, excerciseTargetMet, setExcerciseTargetMet } = props
    const selectedDate = new Date(props.selectedDate)
    const formIsDirty = ((lightExcerciseDuration && (lightExcerciseDuration !== currentPost.data[challengeId].lightExcerciseDuration))
        || (mediumExcerciseDuration && (mediumExcerciseDuration !== currentPost.data[challengeId].mediumExcerciseDuration))
        || (heavyExcerciseDuration && (heavyExcerciseDuration !== currentPost.data[challengeId].heavyExcerciseDuration)))
    const lightGoal = currentPost.targets[challengeId].lightExcerciseDuration
    const lightScore = currentPost.data[challengeId].lightExcerciseDuration
    const mediumGoal = currentPost.targets[challengeId].mediumExcerciseDuration
    const mediumScore = currentPost.data[challengeId].mediumExcerciseDuration
    const heavyGoal = currentPost.targets[challengeId].heavyExcerciseDuration
    const heavyScore = currentPost.data[challengeId].heavyExcerciseDuration
    const userProgressingTowardsGoal = ((lightScore > 0 || mediumScore > 0 || heavyScore > 0) && ((lightScore < lightGoal) || (mediumScore < mediumGoal) || (heavyScore < heavyGoal)))
    const condition = ((lightScore >= lightGoal) && (mediumScore >= mediumGoal) && (heavyScore >= heavyGoal))
    const userMetGoal = () => {
        if (condition) {
            setExcerciseTargetMet(true)
            return true
        } else {
            return false
        }
    }
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
    const MessageForDay = ({ isToday }) => {
        if (isToday) {
            return (<p className='text-secondary'>How much excercise have you done today?</p>)
        } else {
            return (<p className='text-secondary'>How much excercise did you do this day?</p>)
        }

    }
    const GoalReadout = ({ lightTime, mediumTime, heavyTime }) => {
        return (
            <Container>
                <span style={{ display: 'block' }} className='text-info'>
                    Goals:
            </span>
                <span style={{ display: 'block' }} className='text-info'>
                    {`${lightTime} minutes light`}
                </span>
                <span style={{ display: 'block' }} className='text-info'>
                    {`${mediumTime} minutes medium`}
                </span>
                <span style={{ display: 'block' }} className='text-info'>
                    {`${heavyTime} minutes high`}
                </span>
            </Container>
        )
    }

    return (
        <>
            <MessageForDay
                isToday={isToday(selectedDate)}
            />
            <GoalReadout
                lightTime={currentPost.targets[challengeId].lightExcerciseDuration}
                mediumTime={currentPost.targets[challengeId].mediumExcerciseDuration}
                heavyTime={currentPost.targets[challengeId].heavyExcerciseDuration}
            />
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal()}
            />
            <fieldset >
                <InputGroup className='mb-2'>
                    <Label for="lightExcerciseDuration" hidden>Light intensity</Label>
                    <InputGroupAddon addonType="prepend">Light intensity</InputGroupAddon>
                    <Input name="lightExcerciseDuration" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].lightExcerciseDuration) || '0'}
                        onChange={handleLightExcerciseDuration}
                    />
                </InputGroup>
                <InputGroup className='mb-2'>
                    <Label for="mediumExcerciseDuration" hidden>Medium intensity</Label>
                    <InputGroupAddon addonType="prepend">Medium intensity</InputGroupAddon>
                    <Input name="mediumExcerciseDuration" type="number"
                        placeholder={(currentPost.data && currentPost.data[challengeId].mediumExcerciseDuration) || '0'}
                        onChange={handleMediumExcerciseDuration}
                    />
                </InputGroup>
                <InputGroup className='mb-2'>
                    <Label for="heavyExcerciseDuration" hidden>High intensity</Label>
                    <InputGroupAddon addonType="prepend">High intensity</InputGroupAddon>
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