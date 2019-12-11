import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function WaterChallengeInfo({ currentPost, selectedDateIsToday, challengeId, waterProgress, waterSuccess }) {
    const { quantityWaterDrank, quantityWaterDrankUnits } = currentPost.targets[challengeId]
    return (
        <>
            {selectedDateIsToday
                ?
                (<p className='text-secondary'>How much water have you drank today?</p>)
                :
                (<p className='text-secondary'>How much water did you drink this day?</p>)}
            <span style={{ display: 'block' }} className='text-info'>
                Your goal: {quantityWaterDrank} {quantityWaterDrankUnits}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={waterProgress}
                userMetGoal={waterSuccess}
            />
        </>
    )
}
