export const contestPosts = {
	contestPost_01: {
		userId: 'user_01',
		challengeId: 'challenge_01',
		contestId: 'contest_01',
		postDate: 'Wed Aug 28 2019 22:00:00 GMT-0500 (Central Daylight Time)',
	},
	contestPost_02: {
		userId: 'user_02',
		challengeId: 'challenge_01',
		contestId: 'contest_01',
		postDate: 'Wed Aug 28 2019 22:15:00 GMT-0500 (Central Daylight Time)',
	},
	contestPost_03: {
		userId: 'user_04',
		challengeId: 'challenge_01',
		contestId: 'contest_02',
		postDate: 'Sun Aug 25 2019 20:30:00 GMT-0500 (Central Daylight Time)',
	},
	contestPost_04: {
		userId: 'user_05',
		challengeId: 'challenge_01',
		contestId: 'contest_02',
		postDate: 'Sun Aug 25 2019 21:30:00 GMT-0500 (Central Daylight Time)',
	},
}
export const contests = [
	{
		sampleId: 'contest_01',
		title: 'The First Contest',
		dateBeginChallenge: 'Wed Aug 28 2019 00:00:00 GMT-0500 (Central Daylight Time)',
		numberOfChallenges: '6',
		challengeLengthInWeeks: '2',
		numberOfContestantsAllowed: '3',
		challengeInfoById: {
			challenge_01: {
				orderInContest: '1',
			},
			challenge_02: {
				orderInContest: '2',
			},
			challenge_03: {
				orderInContest: '3',
			},
			challenge_04: {
				orderInContest: '4',
			},
			challenge_05: {
				orderInContest: '5',
			},
			challenge_06: {
				orderInContest: '6',
			},
		},
	},
	{
		sampleId: 'contest_02',
		title: 'The Second Contest',
		dateBeginChallenge: 'Sun Aug 25 2019 00:00:00 GMT-0500 (Central Daylight Time)',
		numberOfChallenges: '1',
		challengeLengthInWeeks: '1',
		numberOfContestantsAllowed: '3',
		challengeInfoById: {
			challenge_01: {
				orderInContest: '1',
			},
			challenge_02: {
				orderInContest: '2',
			},
			challenge_03: {
				orderInContest: '3',
			},
			challenge_04: {
				orderInContest: '4',
			},
			challenge_05: {
				orderInContest: '5',
			},
			challenge_06: {
				orderInContest: '6',
			},
		},
	},
]

export const contestantsByContestId = {
	contest_01: {
		user_01: true,
		user_02: true,
		user_03: true,
	},
	contest_02: {
		user_04: true,
		user_05: true,
		user_06: true,
	},
}

export const users = {
	user_01: {
		name: 'Jane Doe 01',
		email: 'user_01@example.com',
		emailVerified: true,
		userRole: 'contestant',
		username: 'tH3_user_01',
	},
	user_02: {
		name: 'Jane Doe 02',
		email: 'user_02@example.com',
		emailVerified: true,
		userRole: 'contestant',
		username: 'tH3_user_02',
	},
	user_03: {
		name: 'Jane Doe 03',
		email: 'user_03@example.com',
		emailVerified: true,
		userRole: 'contestant',
		username: 'tH3_user_03',
	},
	user_04: {
		name: 'Jane Doe 04',
		email: 'user_04@example.com',
		emailVerified: true,
		userRole: 'contestant',
		username: 'tH3_user_04',
	},
	user_05: {
		name: 'Jane Doe 05',
		email: 'user_05@example.com',
		emailVerified: true,
		userRole: 'contestant',
		username: 'tH3_user_05',
	},
	user_06: {
		name: 'Jane Doe 06',
		email: 'user_06@example.com',
		emailVerified: true,
		userRole: 'contestant',
		username: 'tH3_user_06',
	},
}
