import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import useInputValue from '../../../modules/hooks/useInputValue'

export default function ExcerciseChallengeInputs({ defaultValues }) {
    const lightExcerciseDuration = useInputValue(defaultValues.lightExcerciseDuration)
    const mediumExcerciseDuration = useInputValue(defaultValues.mediumExcerciseDuration)
    const heavyExcerciseDuration = useInputValue(defaultValues.heavyExcerciseDuration)
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
                    {...mediumExcerciseDuration}
                />
            </InputGroup>
            <InputGroup className='mb-2'>
                <Label for="heavyExcerciseDuration" hidden />
                <InputGroupAddon addonType="prepend">Heavy</InputGroupAddon>
                <Input
                    name="heavyExcerciseDuration"
                    type="number"
                    {...heavyExcerciseDuration}
                />
            </InputGroup>
        </>
    )
}
