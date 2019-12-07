import React from 'react'
import { Badge } from 'reactstrap'

const ProgressMsg = ({ userProgressingTowardsGoal, userMetGoal, userUnderBudget, userOverBudget }) => {
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
    }
    if (userUnderBudget) {
        return (
            <span style={{ display: 'block' }}>
                <Badge color='success'>
                    Still under budget!
                </Badge>
            </span>
        )
    }
    if (userOverBudget) {
        return (
            <span style={{ display: 'block' }}>
                <Badge color='warning'>
                    Limit exceeded, keep trying!
                    </Badge>
            </span>
        )
    } else {
        return null
    }
}
export default ProgressMsg