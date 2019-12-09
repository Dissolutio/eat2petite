import { isAfter } from 'date-fns'

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
	return Object.values(objectToFlatten).reduce((reduction, current) => {
		return {
			...reduction,
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