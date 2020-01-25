import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function ProteinPostInfo({ selectedDateIsToday, currentPost, challengeId, proteinProgress, proteinSuccess }) {
    const goal = parseInt(currentPost.targets[challengeId].proteinConsumed)
    return (
        <>
            {selectedDateIsToday ?
                (<p className='text-secondary'>How much protein have you eaten today?</p>)
                :
                (<p className='text-secondary'>How much protein did you eat that day?</p>)
            }
            <span style={{ display: 'block' }} className='text-info'>
                {`Your goal: ${goal} grams`}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={proteinProgress}
                userMetGoal={proteinSuccess}
            />
        </>)
}
