import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { useRealtimeDataContext } from 'contexts'
import { useInputValue, useFormAlert } from 'hooks'

export default function EditChallengeForm({ challenge }) {
    const challengeName = useInputValue(challenge.challengeName)
    const description = useInputValue(challenge.description)
    const { updateChallenge } = useRealtimeDataContext()
    const { fireAlert, CurrentAlertDisplay } = useFormAlert()
    const saveChallenge = event => {
        event.preventDefault()
        const newChallenge = {
            ...challenge,
            challengeName: event.target.challengeName.value,
            description: event.target.description.value,
        }
        updateChallenge(newChallenge).then(() => {
            fireAlert({ text: `Challenge updated!`, color: 'success' })
        })
            .catch(error => {
                console.log(error)
                fireAlert({ text: `Failed to update!`, color: 'danger' })
            })
    }
    return (
        <Form onSubmit={event => saveChallenge(event)}>
            <CurrentAlertDisplay />
            <Button type="submit" color='warning'>Save Changes</Button>
            <FormGroup>
                <Label for="challengeName">Title</Label>
                <Input type="text" name="challengeName" {...challengeName} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input style={{ minHeight: '200px' }} type="textarea" name="description" {...description} />
            </FormGroup>
        </Form>
    )
}

