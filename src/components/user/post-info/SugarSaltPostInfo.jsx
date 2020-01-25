import React from 'react'
import ProgressMsg from '../ProgressMsg'

export default function SugarSaltPostInfo({ currentPost, selectedDateIsToday, challengeId, userUnderBudget }) {
    const sugarLimit = parseInt(currentPost.targets[challengeId].quantitySugarConsumed)
    const saltLimit = parseInt(currentPost.targets[challengeId].quantitySaltConsumed)

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
                userOverBudget={!userUnderBudget}
            />
        </>
    )
}