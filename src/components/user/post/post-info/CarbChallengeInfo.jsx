import React from 'react'
import ProgressMsg from '../ProgressMsg'
export default function CarbChallengeInfo({ currentPost, selectedDateIsToday, challengeId, userUnderBudget }) {
    const goalLimit = parseInt(currentPost.targets[challengeId].refinedCarbsConsumed)
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
                userOverBudget={!userUnderBudget}
            />
        </>
    )
}