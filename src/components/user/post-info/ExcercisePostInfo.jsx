import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function ExcercisePostInfo(props) {
    const { currentPost, selectedDateIsToday, challengeId, excerciseProgress, excerciseSuccess } = props
    const lightGoal = currentPost.targets[challengeId].lightExcerciseDuration
    const mediumGoal = currentPost.targets[challengeId].mediumExcerciseDuration
    const heavyGoal = currentPost.targets[challengeId].heavyExcerciseDuration

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
                userProgressingTowardsGoal={excerciseProgress}
                userMetGoal={excerciseSuccess}
            />
        </>
    )
}