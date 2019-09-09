// 2 contests, 6 users, 6 challenges, 4 posts, and a 7th user who is the admin
export const posts = [
	{
		uid: 'post_1',
		contestId: 'contest_1',
		userId: 'user_1',
		challengeId: 'challenge_1',
		createdAt: 'Wed Aug 28 2019 22:00:00 GMT-0500 (Central Daylight Time)',
		editedAt: 'Wed Aug 28 2019 22:00:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '6.66',
			quantityUnits: 'cups',
		},
	},
	{
		uid: 'post_2',
		contestId: 'contest_1',
		userId: 'user_2',
		challengeId: 'challenge_1',
		createdAt: 'Wed Aug 28 2019 22:16:00 GMT-0500 (Central Daylight Time)',
		editedAt: '',
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
		createdAt: 'Sun Aug 25 2019 20:30:00 GMT-0500 (Central Daylight Time)',
		editedAt: 'Sun Aug 25 2019 20:31:00 GMT-0500 (Central Daylight Time)',
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
		createdAt: 'Sun Aug 25 2019 21:30:00 GMT-0500 (Central Daylight Time)',
		editedAt: '',
		postData: {
			quantity: '6.66',
			quantityUnits: 'liters',
		},
	},
]
export const contests = [
	{
		uid: 'contest_1',
		title: 'The First Contest: 6 14-Day Challenges',
		startDate: 'Wed Aug 28 2019 00:00:00 GMT-0500 (Central Daylight Time)',
		numberOfChallenges: '6',
		daysPerChallenge: '14',
		enrollmentCap: '3',
		enrolledUsers: {
			user_1: true,
			user_2: true,
			user_3: true,
		},
		challenges: {
			challenge_1: true,
			challenge_2: true,
			challenge_3: true,
			challenge_4: true,
			challenge_5: true,
			challenge_6: true,
		},
		orderOfChallenges: {
			1: 'challenge_1',
			2: 'challenge_2',
			3: 'challenge_3',
			4: 'challenge_4',
			5: 'challenge_5',
			6: 'challenge_6',
		},
	},
	{
		uid: 'contest_2',
		title: 'The Second Contest: 6 3-Day Challenges',
		startDate: 'Sun Aug 25 2019 00:00:00 GMT-0500 (Central Daylight Time)',
		numberOfChallenges: '6',
		daysPerChallenge: '3',
		enrollmentCap: '5',
		enrolledUsers: {
			user_4: true,
			user_5: true,
			user_6: true,
		},
		challenges: {
			challenge_1: true,
			challenge_2: true,
			challenge_3: true,
			challenge_4: true,
			challenge_5: true,
			challenge_6: true,
		},
		orderOfChallenges: {
			1: 'challenge_1',
			2: 'challenge_2',
			3: 'challenge_3',
			4: 'challenge_4',
			5: 'challenge_5',
			6: 'challenge_6',
		},
	},
]
export const sampleUsers = [
	{
		uid: 'user_1',
		name: 'Jane Doe 1',
		email: 'user_1@example.com',
		userRole: 'default',
		username: 'tH3_user_1',
		contests: {
			contest_1: true,
		},
	},
	{
		uid: 'user_2',
		name: 'Jane Doe 2',
		email: 'user_2@example.com',
		userRole: 'default',
		username: 'tH3_user_2',
		contests: {
			contest_1: true,
		},
	},
	{
		uid: 'user_3',
		name: 'Jane Doe 3',
		email: 'user_3@example.com',
		userRole: 'default',
		username: 'tH3_user_3',
		contests: {
			contest_1: true,
		},
	},
	{
		uid: 'user_4',
		name: 'Jane Doe 4',
		email: 'user_4@example.com',
		userRole: 'default',
		username: 'tH3_user_4',
		contests: {
			contest_2: true,
		},
	},
	{
		uid: 'user_5',
		name: 'Jane Doe 5',
		email: 'user_5@example.com',
		userRole: 'default',
		username: 'tH3_user_5',
		contests: {
			contest_2: true,
		},
	},
	{
		uid: 'user_6',
		name: 'Jane Doe 6',
		email: 'user_6@example.com',
		userRole: 'default',
		username: 'tH3_user_6',
		contests: {
			contest_2: true,
		},
	},
	{
		uid: 'user_7',
		name: 'EAT-2-PETITE',
		email: 'eat-2-petite@example.com',
		userRole: 'admin',
		username: 'tH3_user_6',
		contests: {
			contest_1: true,
			contest_2: true,
		},
	},
]

export const challenges = [
	{
		uid: 'challenge_1',
		challengeName: 'Water Intake',
		description:
			'We should consume at least as much water as it takes to fill both of our shoes. We are like camels on the high dunes of the Sahara, high noon suns beckoning us to drink pure water today and tomorrow! No Money shall be vested in one supreme Court, and all other Powers vested by this Constitution in the Government and Regulation of the State Legislature.',
		formulaForTarget: `The person's weight multiplied by a constant. This constant will depend on the individual: are they a beginner? do they work outside or sweat a lot every day?`,
		units: 'volume',
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
		units: 'weight',
	},
	{
		uid: 'challenge_4',
		challengeName: 'Get Active!',
		description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
		formulaForTarget: 'Some amount of time spent on some scale of intensity',
		units: 'intensity',
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
		units: 'weight',
	},
	{
		uid: 'challenge_6',
		challengeName: 'Manage Sugar and Salt Intake',
		description:
			'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
		formulaForTarget: 'Some amount of weight per human',
		units: 'weight',
	},
]
