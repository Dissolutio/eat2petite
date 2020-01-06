import React from 'react'
import { isToday } from 'date-fns'
import { Button } from 'reactstrap'

import WaterChallengeInputs from '../../shared/challenge-inputs/WaterChallengeInputs'
import VegetableChallengeInputs from '../../shared/challenge-inputs/VegetableChallengeInputs'
import ProteinChallengeInputs from '../../shared/challenge-inputs/ProteinChallengeInputs'
import ExcerciseChallengeInputs from '../../shared/challenge-inputs/ExcerciseChallengeInputs'
import CarbChallengeInputs from '../../shared/challenge-inputs/CarbChallengeInputs'
import SugarSaltChallengeInputs from '../../shared/challenge-inputs/SugarSaltChallengeInputs'

import WaterChallengeInfo from './post-info/WaterChallengeInfo'
import VegetableChallengeInfo from './post-info/VegetableChallengeInfo'
import ProteinChallengeInfo from './post-info/ProteinChallengeInfo'
import ExcercisePostInfo from './post-info/ExcercisePostInfo'
import CarbChallengeInfo from './post-info/CarbChallengeInfo'
import SugarSaltPostInfo from './post-info/SugarSaltPostInfo'

import { scorePost } from 'modules/functions'

const SubmitButton = () => {
    return (
        <Button color='primary' type="submit" >
            Update Post!
            </Button>
    )
}

const UserPostInputs = (props) => {
    const { currentPost, challengeId, selectedDateInDashboard } = props
    const {
        waterProgress,
        waterSuccess,
        vegetableProgress,
        vegetableSuccess,
        proteinProgress,
        proteinSuccess,
        excerciseProgress,
        excerciseSuccess,
        carbUnderBudget,
        sugarSaltUnderBudget,
    } = scorePost(currentPost)

    const { quantityWaterDrank, quantityWaterDrankUnits } = currentPost.data.challenge1
    const { servingsVegetablesEaten } = currentPost.data.challenge2
    const { proteinConsumed, proteinConsumedUnits } = currentPost.data.challenge3
    const { lightExcerciseDuration, mediumExcerciseDuration, heavyExcerciseDuration } = currentPost.data.challenge4
    const { refinedCarbsConsumed, refinedCarbsConsumedUnits } = currentPost.data.challenge5
    const { quantitySugarConsumed, quantitySaltConsumed, quantitySugarConsumedUnits, quantitySaltConsumedUnits } = currentPost.data.challenge6

    const selectedDateIsToday = isToday(selectedDateInDashboard)
    if (challengeId === 'challenge1') {
        return (
            <>
                <WaterChallengeInfo
                    waterProgress={waterProgress}
                    waterSuccess={waterSuccess}
                    currentPost={currentPost}
                    selectedDateIsToday={selectedDateIsToday}
                    challengeId={challengeId}
                />
                <WaterChallengeInputs
                    quantityWaterDrank={quantityWaterDrank}
                    quantityWaterDrankUnits={quantityWaterDrankUnits}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge2') {
        return (
            <>
                <VegetableChallengeInfo
                    vegetableProgress={vegetableProgress}
                    vegetableSuccess={vegetableSuccess}
                    challengeId={challengeId}
                    currentPost={currentPost}
                    selectedDateIsToday={selectedDateIsToday}
                />
                <VegetableChallengeInputs
                    servingsVegetablesEaten={servingsVegetablesEaten}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge3') {
        return (
            <>
                <ProteinChallengeInfo
                    proteinProgress={proteinProgress}
                    proteinSuccess={proteinSuccess}
                    selectedDateIsToday={selectedDateIsToday}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <ProteinChallengeInputs
                    proteinConsumed={proteinConsumed}
                    proteinConsumedUnits={proteinConsumedUnits}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge4') {
        return (
            <>
                <ExcercisePostInfo
                    excerciseProgress={excerciseProgress}
                    excerciseSuccess={excerciseSuccess}
                    selectedDateIsToday={selectedDateIsToday}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <ExcerciseChallengeInputs
                    lightExcerciseDuration={lightExcerciseDuration}
                    mediumExcerciseDuration={mediumExcerciseDuration}
                    heavyExcerciseDuration={heavyExcerciseDuration}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge5') {
        return (
            <>
                <CarbChallengeInfo
                    userUnderBudget={carbUnderBudget}
                    selectedDateIsToday={selectedDateIsToday}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <CarbChallengeInputs
                    refinedCarbsConsumed={refinedCarbsConsumed}
                    refinedCarbsConsumedUnits={refinedCarbsConsumedUnits}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge6') {
        return (
            <>
                <SugarSaltPostInfo
                    userUnderBudget={sugarSaltUnderBudget}
                    selectedDateIsToday={selectedDateIsToday}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <SugarSaltChallengeInputs
                    currentPost={currentPost}
                    quantitySugarConsumed={quantitySugarConsumed}
                    quantitySaltConsumed={quantitySaltConsumed}
                    quantitySugarConsumedUnits={quantitySugarConsumedUnits}
                    quantitySaltConsumedUnits={quantitySaltConsumedUnits}
                />
                <SubmitButton />
            </>
        )
    }
    else {
        return (
            null
        )
    }
}
export default UserPostInputs