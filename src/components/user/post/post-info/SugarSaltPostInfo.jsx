import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function SugarSaltPostInfo({ currentPost, setSugarSaltLimitExceeded, selectedDateIsToday, challengeId }) {
    const sugarLimit = currentPost.targets[challengeId].quantitySugarConsumed
    console.log("TCL: SugarSaltPostInfo -> sugarLimit", sugarLimit)
    const saltLimit = currentPost.targets[challengeId].quantitySaltConsumed
    const sugarScore = currentPost.data[challengeId].quantitySugarConsumed
    const saltScore = currentPost.data[challengeId].quantitySaltConsumed
    const userUnderBudget = currentPost && ((saltScore <= saltLimit) && (sugarScore <= sugarLimit))
    const userOverBudget = () => {
        if ((sugarScore > sugarLimit) || (saltScore > saltLimit)) {
            setSugarSaltLimitExceeded(true)
            return true
        } else {
            setSugarSaltLimitExceeded(false)
            return false
        }
    }
    return (
        <>
            {selectedDateIsToday
                ?
                (<p className='text-secondary'>How many grams of sugar and salt have you consumed today?</p>)
                :
                (<p className='text-secondary'>How many grams of sugar and salt did you consume that day?</p>)
            }
            <span style={{ display: 'block' }} className='text-info'>
                {`Limits: ${sugarLimit} grams sugar, ${saltLimit} grams salt`}
            </span>
            <ProgressMsg
                userUnderBudget={userUnderBudget}
                userOverBudget={userOverBudget()}
            />
        </>
    )
}