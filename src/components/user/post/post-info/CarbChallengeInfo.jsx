import React from 'react'
import ProgressMsg from '../ProgressMsg'
export default function CarbChallengeInfo({ currentPost, setCarbLimitExceeded, selectedDateIsToday, challengeId }) {
    const goalLimit = currentPost.targets[challengeId].refinedCarbsConsumed
    const score = currentPost.data[challengeId].refinedCarbsConsumed
    const userUnderBudget = currentPost && (score <= goalLimit)
    const userOverBudget = () => {
        if (score >= goalLimit) {
            setCarbLimitExceeded(true)
            return true
        } else {
            setCarbLimitExceeded(false)
            return false
        }
    }
    return (
        <>
            {selectedDateIsToday
                ?
                (<p className='text-secondary'>How many calories from simple carbohydrates have you consumed today?</p>)
                :
                (<p className='text-secondary'>How many calories from simple carbohydrates did you consume that day?</p>)
            }
            <span style={{ display: 'block' }} className='text-info'>
                {`Goal: <= ${goalLimit}`}
            </span>
            <ProgressMsg
                userUnderBudget={userUnderBudget}
                userOverBudget={userOverBudget()}
            />
        </>
    )
}