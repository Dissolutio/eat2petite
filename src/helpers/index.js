import { format, isAfter } from 'date-fns'

export { adaptContests } from './contestsAdapter'

export function progressHighlightDateArr(userPostsArr) {
	return (
		userPostsArr &&
		userPostsArr
			.filter((post) => !!post.lastEditedAt)
			.map((post) => format(new Date(post.postDate), 'MMMM d, yyyy'))
	)
}
export function successHighlightDateArr(userPostsArr) {
	function forSuccess(post) {
		const targetsMet = post && post.targetsMet
		return targetsMet && Object.values(targetsMet).some((item) => item)
	}
	function toFormattedDates(post) {
		return format(new Date(post.postDate), 'MMMM d, yyyy')
	}
	const targetsMetDays = userPostsArr && userPostsArr.filter(forSuccess)
	return targetsMetDays.map(toFormattedDates)
}
export const ordinalSuffixOf = (i) => {
	const j = i % 10,
		k = i % 100;
	if (j === 1 && k !== 11) {
		return i + "st";
	}
	if (j === 2 && k !== 12) {
		return i + "nd";
	}
	if (j === 3 && k !== 13) {
		return i + "rd";
	}
	return i + "th";
}
export function sortByMostCurrentStartDate(a, b) {
	if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
		return -1
	} else {
		return 1
	}
}
export function lastInitial(string) {
	return string.split('')[0].toUpperCase() + '.'
}

export function flatten(objectToFlatten) {
	return Object.values(objectToFlatten).reduce((previous, current) => {
		return {
			...previous,
			...current,
		}
	}, {})
}

export function buildNewTargetsFromEvent(event) {
	return {
		challenge1: {
			quantityWaterDrank:
				event.target.quantityWaterDrank && event.target.quantityWaterDrank.value,
			quantityWaterDrankUnits:
				event.target.quantityWaterDrankUnits && event.target.quantityWaterDrankUnits.value,
		},
		challenge2: {
			servingsVegetablesEaten:
				event.target.servingsVegetablesEaten && event.target.servingsVegetablesEaten.value,
		},
		challenge3: {
			proteinConsumed: event.target.proteinConsumed && event.target.proteinConsumed.value,
		},
		challenge4: {
			lightExcerciseDuration:
				event.target.lightExcerciseDuration && event.target.lightExcerciseDuration.value,
			mediumExcerciseDuration:
				event.target.mediumExcerciseDuration && event.target.mediumExcerciseDuration.value,
			heavyExcerciseDuration:
				event.target.heavyExcerciseDuration && event.target.heavyExcerciseDuration.value,
		},
		challenge5: {
			refinedCarbsConsumed:
				event.target.refinedCarbsConsumed && event.target.refinedCarbsConsumed.value,
		},
		challenge6: {
			quantitySugarConsumed:
				event.target.quantitySugarConsumed && event.target.quantitySugarConsumed.value,
			quantitySugarConsumedUnits:
				event.target.quantitySugarConsumedUnits && event.target.quantitySugarConsumedUnits.value,
			quantitySaltConsumed:
				event.target.quantitySaltConsumed && event.target.quantitySaltConsumed.value,
			quantitySaltConsumedUnits:
				event.target.quantitySaltConsumedUnits && event.target.quantitySaltConsumedUnits.value,
		},
	}
}

export function scorePost(post) {
	if (!post) return null
	const waterGoal = post.targets.challenge1.quantityWaterDrank
	const waterScore = post.data.challenge1.quantityWaterDrank
	const waterProgress = waterScore > 0 && waterScore < waterGoal
	const waterSuccess = waterScore >= waterGoal

	const vegGoal = parseInt(post.targets.challenge2.servingsVegetablesEaten)
	const vegScore = parseInt(post.data.challenge2.servingsVegetablesEaten)
	const vegetableProgress = vegScore > 0 && vegScore < vegGoal
	const vegetableSuccess = vegScore >= vegGoal

	const proteinGoal = parseInt(post.targets.challenge3.proteinConsumed)
	const proteinScore = parseInt(post.data.challenge3.proteinConsumed)
	const proteinProgress = proteinScore > 0 && proteinScore < proteinGoal
	const proteinSuccess = proteinScore >= proteinGoal

	const lightExcerciseGoal = parseInt(post.targets.challenge4.lightExcerciseDuration)
	const mediumExcerciseGoal = parseInt(post.targets.challenge4.mediumExcerciseDuration)
	const heavyExcerciseGoal = parseInt(post.targets.challenge4.heavyExcerciseDuration)
	const lightExcerciseScore = parseInt(post.data.challenge4.lightExcerciseDuration)
	const mediumExcerciseScore = parseInt(post.data.challenge4.mediumExcerciseDuration)
	const heavyExcerciseScore = parseInt(post.data.challenge4.heavyExcerciseDuration)
	const excerciseProgress = (lightExcerciseScore > 0 || mediumExcerciseScore > 0 || heavyExcerciseScore > 0) && (
		(lightExcerciseScore < lightExcerciseGoal)
		|| (mediumExcerciseScore < mediumExcerciseGoal)
		|| (heavyExcerciseScore < heavyExcerciseGoal)
	)
	const excerciseSuccess = ((lightExcerciseScore >= lightExcerciseGoal) && (mediumExcerciseScore >= mediumExcerciseGoal) && (heavyExcerciseScore >= heavyExcerciseGoal))

	const carbLimit = parseInt(post.targets.challenge5.refinedCarbsConsumed)
	const carbScore = parseInt(post.data.challenge5.refinedCarbsConsumed)
	const carbUnderBudget = post && (carbScore <= carbLimit)


	const sugarLimit = parseInt(post.targets.challenge6.quantitySugarConsumed)
	const saltLimit = parseInt(post.targets.challenge6.quantitySaltConsumed)
	const sugarScore = parseInt(post.data.challenge6.quantitySugarConsumed)
	const saltScore = parseInt(post.data.challenge6.quantitySaltConsumed)
	const sugarSaltUnderBudget = (sugarScore <= sugarLimit) && (saltScore <= saltLimit)

	return {
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
	}
}