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

const SubmitButton = () => {
    return (
        <Button color='primary' type="submit" >
            Update Post!
            </Button>
    )
}

const UserPostInputs = (props) => {
    const {
        currentPost, challengeId, selectedDateInDashboard, setWaterTargetMet,
        setVegetableTargetMet, setProteinTargetMet, setExcerciseTargetMet,
        setCarbLimitExceeded, setSugarSaltLimitExceeded
    } = props

    const selectedDateIsToday = isToday(selectedDateInDashboard)

    if (challengeId === 'challenge1') {
        return (
            <>
                <WaterChallengeInfo
                    currentPost={currentPost}
                    selectedDateIsToday={selectedDateIsToday}
                    challengeId={challengeId}
                    setWaterTargetMet={setWaterTargetMet}
                />
                <WaterChallengeInputs
                    defaultValues={{
                        quantityWaterDrank: currentPost.data[challengeId].quantityWaterDrank,
                        quantityWaterDrankUnits: currentPost.data[challengeId].quantityWaterDrankUnits,
                    }}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge2') {
        return (
            <>
                <VegetableChallengeInfo
                    challengeId={challengeId}
                    currentPost={currentPost}
                    selectedDateIsToday={selectedDateIsToday}
                    setVegetableTargetMet={setVegetableTargetMet}
                />
                <VegetableChallengeInputs
                    defaultValues={{
                        servingsVegetablesEaten: currentPost.data[challengeId].servingsVegetablesEaten,
                    }}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge3') {
        return (
            <>
                <ProteinChallengeInfo
                    selectedDateIsToday={selectedDateIsToday}
                    setProteinTargetMet={setProteinTargetMet}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <ProteinChallengeInputs
                    defaultValues={{
                        proteinConsumed: currentPost.data[challengeId].proteinConsumed,
                        proteinConsumedUnits: currentPost.data[challengeId].proteinConsumedUnits,
                    }}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge4') {
        return (
            <>
                <ExcercisePostInfo
                    selectedDateIsToday={selectedDateIsToday}
                    setExcerciseTargetMet={setExcerciseTargetMet}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <ExcerciseChallengeInputs
                    defaultValues={{
                        excerciseDurationUnits: currentPost.data[challengeId].excerciseDurationUnits,
                        lightExcerciseDuration: currentPost.data[challengeId].lightExcerciseDuration,
                        mediumExcerciseDuration: currentPost.data[challengeId].mediumExcerciseDuration,
                        heavyExcerciseDuration: currentPost.data[challengeId].heavyExcerciseDuration,
                    }}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge5') {
        return (
            <>
                <CarbChallengeInfo
                    selectedDateIsToday={selectedDateIsToday}
                    setCarbLimitExceeded={setCarbLimitExceeded}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <CarbChallengeInputs
                    defaultValues={{
                        refinedCarbsConsumed: currentPost.data[challengeId].refinedCarbsConsumed,
                        refinedCarbsConsumedUnits: currentPost.data[challengeId].refinedCarbsConsumedUnits,
                    }}
                />
                <SubmitButton />
            </>
        )
    }
    if (challengeId === 'challenge6') {
        return (
            <>
                <SugarSaltPostInfo
                    selectedDateIsToday={selectedDateIsToday}
                    setSugarSaltLimitExceeded={setSugarSaltLimitExceeded}
                    currentPost={currentPost}
                    challengeId={challengeId}
                />
                <SugarSaltChallengeInputs
                    currentPost={currentPost}
                    defaultValues={{
                        quantitySugarConsumed: currentPost.data[challengeId].quantitySugarConsumed,
                        quantitySaltConsumed: currentPost.data[challengeId].quantitySaltConsumed,
                        quantitySugarConsumedUnits: currentPost.data[challengeId].quantitySugarConsumedUnits,
                        quantitySaltConsumedUnits: currentPost.data[challengeId].quantitySaltConsumedUnits,
                    }}
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