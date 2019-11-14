import React, { useState } from 'react'
import { Button, Badge, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format, isToday } from 'date-fns'

import { useDataContext } from '../../contexts/useDataContext'

export default function WaterChallengePost(props) {
    const { savePost } = useDataContext()
    const { formDisabled, me, currentPost, currentChallenge, challenges } = props
    const selectedDate = new Date(props.selectedDate)
    const [quantityWaterDrank, setQuantityDrank] = useState(0)
    const [quantityWaterDrankUnits, setQuantityDrankUnits] = useState('cups')

    function handleQuantityDrankInput(event) {
        const newValue = event.target.value
        if (newValue) {
            setQuantityDrank(newValue)
        }
        if (newValue) {
        }
    }
    function handleQuantityDrankUnitsChange(event) {
        setQuantityDrankUnits(event.target.value)
    }

    function buildUpdatePost(event) {
        const updatedPostTarget = () => {
            const userTargetForDate = me.challengeTargetsForDates && me.challengeTargetsForDates[`${format(selectedDate, 'yyyy-MM-dd')}`]
            const currentPostHasTarget = currentPost && currentPost.target.challenge1
            const userChallengeTarget = me.challengeTargets && me.challengeTargets[currentChallenge.uid]
            const challengeDefaultTarget = challenges[currentChallenge.uid] && challenges[currentChallenge.uid].defaultTarget
            return userTargetForDate || currentPostHasTarget || userChallengeTarget || challengeDefaultTarget
        }
        return {
            ...currentPost,
            quantityWaterDrank,
            quantityWaterDrankUnits: event.target.quantityWaterDrankUnits.value || currentPost.quantityWaterDrankUnits,
            lastEditedAt: (new Date()).toString(),
            target: {
                ...currentPost.target,
                challenge1: updatedPostTarget(),
            },
        }
    }
    function onSubmitForm(event) {
        event.preventDefault()
        savePost(buildUpdatePost(event))
    }
    const ProgressMsg = () => {
        const goal = currentPost.target.challenge1.quantityWaterDrank
        const score = currentPost.quantityWaterDrank
        if (score > 0 && score < goal) {
            return (
                <span style={{ display: 'block' }}>
                    <Badge color='info'>
                        Keep it up!
                    </Badge>
                </span>
            )
        }
        if (score >= goal) {
            return (
                <span style={{ display: 'block' }}>
                    <Badge color='success'>
                        You met your goal!
                    </Badge>
                </span>
            )
        } else {
            return null
        }
    }
    const MessageForDay = () => {
        return (
            <div>
                {isToday(selectedDate) ?
                    (<p className='text-secondary'>How much water have you drank today?</p>)
                    :
                    (<p className='text-secondary'>How much water did you drink this day?</p>)
                }
                <span style={{ display: 'block' }} className='text-info'>
                    Your goal: {currentPost.target.challenge1.quantityWaterDrank} {currentPost.target.challenge1.quantityWaterDrankUnits}
                </span>
                <ProgressMsg />
            </div>
        )
    }
    return (
        <Form onSubmit={onSubmitForm} >
            <MessageForDay />
            <fieldset disabled={formDisabled}>
                <InputGroup className='mb-2'>
                    <Label for="quantity" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="quantity" type="number" placeholder={currentPost.quantityWaterDrank} onChange={handleQuantityDrankInput} />
                </InputGroup>
                <InputGroup size="sm">
                    <Label for="quantityUnits" hidden>Units</Label>
                    <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                    <Input type="select" name="quantityWaterDrankUnits" disabled value={quantityWaterDrankUnits} onChange={handleQuantityDrankUnitsChange} bsSize='sm'>
                        <option value="cups">Cups</option>
                        <option value="ounces">Ounces</option>
                        <option value="liters">Liters</option>
                    </Input>
                </InputGroup>
            </fieldset>
            {
                (quantityWaterDrank && (quantityWaterDrank !== currentPost.quantityWaterDrank))
                    ?
                    (<Button type="submit" disabled={formDisabled}>Update Post!</Button>)
                    :
                    null
            }
        </Form>
    )
}