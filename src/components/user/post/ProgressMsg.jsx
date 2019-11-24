import React from 'react'
import { Badge } from 'reactstrap'

const ProgressMsg = ({ userProgressingTowardsGoal, userMetGoal }) => {
    if (userProgressingTowardsGoal) {
        return (
            <span style={{ display: 'block' }}>
                <Badge color='info'>
                    Keep it up!
            </Badge>
            </span>
        )
    }
    if (userMetGoal) {
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
export default ProgressMsg