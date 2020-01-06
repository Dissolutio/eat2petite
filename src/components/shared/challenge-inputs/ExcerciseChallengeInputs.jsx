import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function ExcerciseChallengeInputs({ lightExcerciseDuration, mediumExcerciseDuration, heavyExcerciseDuration }) {
    return (
        <>
            <InputGroup className='mb-2'>
                <Label for="lightExcerciseDuration" hidden />
                <InputGroupAddon addonType="prepend">Light</InputGroupAddon>
                <Input
                    name="lightExcerciseDuration"
                    type="number"
                    {...lightExcerciseDuration}
                />
            </InputGroup>
            <InputGroup className='mb-2'>
                <Label for="mediumExcerciseDuration" hidden />
                <InputGroupAddon addonType="prepend">Medium</InputGroupAddon>
                <Input
                    name="mediumExcerciseDuration"
                    type="number"
                    defaultValue={mediumExcerciseDuration}
                />
            </InputGroup>
            <InputGroup className='mb-2'>
                <Label for="heavyExcerciseDuration" hidden />
                <InputGroupAddon addonType="prepend">Heavy</InputGroupAddon>
                <Input
                    name="heavyExcerciseDuration"
                    type="number"
                    defaultValue={heavyExcerciseDuration}
                />
            </InputGroup>
        </>
    )
}
