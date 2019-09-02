// 2 contests, 6 users, 6 challenges, 4 posts
export const posts = [
	{
		uid: 'post_1',
		contestId: 'contest_01',
		userId: 'user_1',
		challengeId: 'challenge_01',
		postDate: 'Wed Aug 28 2019 22:00:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '6.66',
			quantityUnits: 'cups',
		},
	},
	{
		uid: 'post_2',
		contestId: 'contest_01',
		userId: 'user_2',
		challengeId: 'challenge_01',
		postDate: 'Wed Aug 28 2019 22:15:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '6.66',
			quantityUnits: 'liters',
		},
	},
	{
		uid: 'post_3',
		contestId: 'contest_02',
		userId: 'user_4',
		challengeId: 'challenge_01',
		postDate: 'Sun Aug 25 2019 20:30:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '6.66',
			quantityUnits: 'cups',
		},
	},
	{
		uid: 'post_4',
		contestId: 'contest_02',
		userId: 'user_5',
		challengeId: 'challenge_01',
		postDate: 'Sun Aug 25 2019 21:30:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '6.66',
			quantityUnits: 'liters',
		},
	},
]
export const contests = [
	{
		uid: 'contest_1',
		title: 'The First Contest',
		dateBeginChallenge: 'Wed Aug 28 2019 00:00:00 GMT-0500 (Central Daylight Time)',
		numberOfChallenges: '6',
		challengeLengthInWeeks: '2',
		numberOfContestantsAllowed: '3',
		contestants: {
			user_1: true,
			user_2: true,
			user_3: true,
		},
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
		uid: 'contest_2',
		title: 'The Second Contest',
		dateBeginChallenge: 'Sun Aug 25 2019 00:00:00 GMT-0500 (Central Daylight Time)',
		numberOfChallenges: '1',
		challengeLengthInWeeks: '1',
		numberOfContestantsAllowed: '3',
		contestants: {
			user_4: true,
			user_5: true,
			user_6: true,
		},
		challenges: {
			challenge_01: true,
			challenge_02: true,
			challenge_03: true,
			challenge_04: true,
			challenge_05: true,
			challenge_06: true,
		},
		orderOfChallenges: {
			1: 'challenge_01',
			2: 'challenge_02',
			3: 'challenge_03',
			4: 'challenge_04',
			5: 'challenge_05',
			6: 'challenge_06',
		},
	},
]
export const users = [
	{
		uid: 'user_1',
		name: 'Jane Doe 1',
		email: 'user_1@example.com',
		userRole: 'contestant',
		username: 'tH3_user_1',
	},
	{
		uid: 'user_2',
		name: 'Jane Doe 2',
		email: 'user_2@example.com',
		userRole: 'contestant',
		username: 'tH3_user_2',
	},
	{
		uid: 'user_3',
		name: 'Jane Doe 3',
		email: 'user_3@example.com',
		userRole: 'contestant',
		username: 'tH3_user_3',
	},
	{
		uid: 'user_4',
		name: 'Jane Doe 4',
		email: 'user_4@example.com',
		userRole: 'contestant',
		username: 'tH3_user_4',
	},
	{
		uid: 'user_5',
		name: 'Jane Doe 5',
		email: 'user_5@example.com',
		userRole: 'contestant',
		username: 'tH3_user_5',
	},
	{
		uid: 'user_6',
		name: 'Jane Doe 6',
		email: 'user_6@example.com',
		userRole: 'contestant',
		username: 'tH3_user_6',
	},
]

export const challenges = [
	{
		uid: 'challenge_1',
		challengeName: 'Water Intake',
		description:
			'We should consume at least as water as it takes to fill both of our shoes. We are like camels on the high dunes of the Sahara, high noon suns beckoning us to drink pure water today and tomorrow! No Money shall be vested in one supreme Court, and all other Powers vested by this Constitution in the Government and Regulation of the State Legislature.',
		formulaForTarget: `The person's weight multiplied by a constant. This constant will depend on the individual: are they a beginner? do they work outside or sweat a lot every day?`,
		units: '',
	},
	{
		uid: 'challenge_2',
		challengeName: 'Eat Vegetables',
		description:
			'Humans grew up as omnivores, and benefit greatly from a large amount of vegetables as a food source. The abundance of micro-nutrients and fiber work wonders for health, and help us unlock our full potential for physical and mental fitness.',
		formulaForTarget: `5 servings a day, adjusted to the individual's situation or goal`,
		units: [`servings`],
		data: {
			typesOfVegetables: ['leafy greens', 'non-green'],
		},
	},
	{
		uid: 'challenge_3',
		challengeName: 'Eat Protein',
		description:
			'We should aim for a target protein level every day for the goals we want to achieve. Our bodies are built from them!',
		formulaForTarget: `A person's weight multiplied by a constant. The constant may vary depending on the individual's needs.`,
		units: 'grams',
	},
	{
		uid: 'challenge_4',
		challengeName: 'Get Active!',
		description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
		formulaForTarget: 'Some amount of time spent on some scale of intensity',
		data: {
			intensities: ['light', 'medium', 'high'],
		},
	},
	{
		uid: 'challenge_5',
		challengeName: 'Manage Carbohydrate Intake',
		description:
			'Vary the sources of where you get your carbs! There are simple and complex carbohydrates. The simple ones are quickly converted to sugar and influence your body in a variety of negative ways when consumed as a main calorie source. We should aim to get the majority of our energy from the much more beneficial complex carbohydrates found in whole grains, fruit, and vegetables.',
		formulaForTarget: `The person's weight multiplied by some constant, adjusted by individual need.`,
		units: 'grams',
	},
	{
		uid: 'challenge_6',
		challengeName: 'Manage Sugar and Salt Intake',
		description:
			'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
		formulaForTarget: 'Some amount of weight per human',
		units: 'grams',
	},
]
