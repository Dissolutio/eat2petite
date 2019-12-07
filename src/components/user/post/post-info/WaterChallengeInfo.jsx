import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function WaterChallengeInfo({ currentPost, setWaterTargetMet, selectedDateIsToday, challengeId }) {
    const goal = currentPost.targets[challengeId].quantityWaterDrank
    const score = currentPost.data[challengeId].quantityWaterDrank
    const userProgressingTowardsGoal = score > 0 && score < goal
    const userMetGoal = () => {
        if (parseInt(score) >= parseInt(goal)) {
            setWaterTargetMet(true)
            return true
        } else {
            setWaterTargetMet(false)
            return false
        }
    }
    return (
        <>
            {selectedDateIsToday
                ?
                (<p className='text-secondary'>How much water have you drank today?</p>)
                :
                (<p className='text-secondary'>How much water did you drink this day?</p>)}
            <span style={{ display: 'block' }} className='text-info'>
                Your goal: {currentPost.targets[challengeId].quantityWaterDrank} {currentPost.targets[challengeId].quantityWaterDrankUnits}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetGoal()}
            />
        </>
    )
}
