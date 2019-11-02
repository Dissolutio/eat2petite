import React, { useState } from 'react'
import { Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format } from 'date-fns'

import { useDataContext } from '../../../../contexts/useDataContext'

export default function WaterChallengePost(props) {
    const { savePost } = useDataContext()
    const { formDisabled, me, currentPost, currentChallenge, challenges } = props
    const selectedDate = new Date(props.selectedDate)
    const [quantityDrank, setQuantityDrank] = useState(0)
    const [quantityDrankUnits, setQuantityDrankUnits] = useState('cups')

    function updatedPostTarget() {
        const userTargetForDate = me.challengeTargetsForDates && me.challengeTargetsForDates[`${format(selectedDate, 'yyyy-MM-dd')}`]
        const currentPostHasTarget = currentPost && currentPost.target
        const userChallengeTarget = me.challengeTargets && me.challengeTargets[currentChallenge.uid]
        const challengeDefaultTarget = challenges[currentChallenge.uid] && challenges[currentChallenge.uid].defaultTarget
        return userTargetForDate || currentPostHasTarget || userChallengeTarget || challengeDefaultTarget
    }

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
        return {
            ...currentPost,
            quantityDrank,
            quantityDrankUnits: (event && event.target && event.target.quantityDrankUnits.value) || currentPost.quantityDrankUnits,
            lastEditedAt: (new Date()).toString(),
            target: updatedPostTarget(),
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault()
        savePost(buildUpdatePost(event))
    }
    return (
        <Form onSubmit={onSubmitForm}>
            <fieldset disabled={formDisabled}>
                <InputGroup size="sm">
                    <Label for="quantity" hidden>Quantity</Label>
                    <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                    <Input name="quantity" type="number" bsSize='sm' placeholder={currentPost.quantityDrank} onChange={handleQuantityDrankInput} />
                </InputGroup>
                <InputGroup size="sm">
                    <Label for="quantityUnits" hidden>Units</Label>
                    <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
                    <Input type="select" name="quantityDrankUnits" value={quantityDrankUnits} onChange={handleQuantityDrankUnitsChange} bsSize='sm'>
                        <option value="cups">Cups</option>
                        <option value="ounces">Ounces</option>
                        <option value="liters">Liters</option>
                    </Input>
                </InputGroup>
            </fieldset>
            {
                (quantityDrank && (quantityDrank !== currentPost.quantityDrank))
                    ?
                    (<Button type="submit" disabled={formDisabled}>Update Post!</Button>)
                    :
                    null
            }
        </Form>
    )
}