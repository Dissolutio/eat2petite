import { isAfter, format } from 'date-fns'

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
export const daysWithInput = (postsArr) => {
	return postsArr.filter(post => !!post.lastEditedAt)
		.map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
}
export const daysWithTargetMet = (postsArr) => {
	return postsArr.filter(post => !!post.lastEditedAt)
		.filter(post => (post.data.challenge1.quantityWaterDrank > post.targets.challenge1.quantityWaterDrank))
		.map(post => format(new Date(post.postDate), 'MMMM d, yyyy'))
}