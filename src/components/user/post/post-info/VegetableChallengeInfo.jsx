import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function VegetableChallengeInfo({ currentPost, setVegetableTargetMet, selectedDateIsToday, challengeId }) {
    const goal = currentPost.targets[challengeId].servingsVegetablesEaten
    const score = currentPost.data[challengeId].servingsVegetablesEaten
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetVegetableGoal = () => {
        if (parseInt(score) >= parseInt(goal)) {
            setVegetableTargetMet(true)
            return true
        } else {
            setVegetableTargetMet(false)
            return false
        }
    }
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
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetVegetableGoal()}
            />
        </>)
}

