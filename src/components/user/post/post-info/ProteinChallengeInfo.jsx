import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function ProteinChallengeInfo({ selectedDateIsToday, setProteinTargetMet, currentPost, challengeId }) {
    const goal = currentPost.targets[challengeId].proteinConsumed
    const score = currentPost.data[challengeId].proteinConsumed
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetProteinGoal = () => {
        if (parseInt(score) >= parseInt(goal)) {
            setProteinTargetMet(true)
            return true
        } else {
            setProteinTargetMet(false)
            return false
        }
    }
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
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetProteinGoal()}
            />
        </>)
}
