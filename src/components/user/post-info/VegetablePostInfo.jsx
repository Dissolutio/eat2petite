import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function VegetablePostInfo({ currentPost, selectedDateIsToday, challengeId, vegetableProgress, vegetableSuccess }) {
    const goal = currentPost.targets[challengeId].servingsVegetablesEaten
    return (
        <>
            {selectedDateIsToday ?
                (<p className='text-secondary'>How many servings of vegetables have you eaten today?</p>)
                :
                (<p className='text-secondary'>How many servings of vegetables did you eat that day?</p>)
            }
            <span style={{ display: 'block' }} className='text-info'>
                {`Goal: ${goal} servings`}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={vegetableProgress}
                userMetGoal={vegetableSuccess}
            />
        </>)
}

