import React from 'react'
import { Button } from 'reactstrap'

const AppearingSubmitButton = ({ formIsDirty }) => {
    if (!formIsDirty) { return null }
    return (<Button type="submit" >Update Post!</Button>)
}
export default AppearingSubmitButton