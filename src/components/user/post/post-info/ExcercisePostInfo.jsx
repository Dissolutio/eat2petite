import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function ExcercisePostInfo(props) {
    const { currentPost, selectedDateIsToday, setExcerciseTargetMet, challengeId } = props
    const lightGoal = currentPost.targets[challengeId].lightExcerciseDuration
    const mediumGoal = currentPost.targets[challengeId].mediumExcerciseDuration
    const heavyGoal = currentPost.targets[challengeId].heavyExcerciseDuration
    const lightScore = currentPost.data[challengeId].lightExcerciseDuration
    const mediumScore = currentPost.data[challengeId].mediumExcerciseDuration
    const heavyScore = currentPost.data[challengeId].heavyExcerciseDuration
    const userProgressingTowardsGoal = ((lightScore > 0 || mediumScore > 0 || heavyScore > 0) && ((lightScore < lightGoal) || (mediumScore < mediumGoal) || (heavyScore < heavyGoal)))
    const condition = ((lightScore >= lightGoal) && (mediumScore >= mediumGoal) && (heavyScore >= heavyGoal))
    const userMetExcerciseGoal = () => {
        if (condition) {
            setExcerciseTargetMet(true)
            return true
        } else {
            setExcerciseTargetMet(false)
            return false
        }
    }

    return (
        <>
            {selectedDateIsToday ?
                (<p className='text-secondary'>How much excercise have you done today?</p>)
                :
                (<p className='text-secondary'>How much excercise did you do this day?</p>)
            }
            <span style={{ display: 'block' }} className='text-info'>
                Goals:
            </span>
            <span style={{ display: 'block' }} className='text-info'>
                {`${lightGoal} mins light intensity`}
            </span>
            <span style={{ display: 'block' }} className='text-info'>
                {`${mediumGoal} mins medium intensity`}
            </span>
            <span style={{ display: 'block' }} className='text-info'>
                {`${heavyGoal} mins high intensity`}
            </span>
            <ProgressMsg
                userProgressingTowardsGoal={userProgressingTowardsGoal}
                userMetGoal={userMetExcerciseGoal()}
            />
        </>
    )
}