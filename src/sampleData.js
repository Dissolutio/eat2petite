// 2 contests, 6 users, 6 challenges, 4 posts, and a 7th user who is the admin
export const samplePosts = [
	{
		sampleId: 'post_1',
		contestId: 'contest_1',
		userId: 'user_1',
		challengeId: 'challenge_1',
		createdAt: 'Wed Aug 28 2019 22:00:00 GMT-0500 (Central Daylight Time)',
		editedAt: 'Wed Aug 28 2019 22:01:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '6.66',
			quantityUnits: 'cups',
		},
	},
	{
		sampleId: 'post_2',
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
		sampleId: 'post_3',
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
		sampleId: 'post_4',
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
	{
		sampleId: 'post_5',
		contestId: 'contest_1',
		userId: 'user_1',
		challengeId: 'challenge_1',
		createdAt: 'Wed Aug 29 2019 22:00:00 GMT-0500 (Central Daylight Time)',
		editedAt: 'Wed Aug 29 2019 22:01:00 GMT-0500 (Central Daylight Time)',
		postData: {
			quantity: '3',
			quantityUnits: 'liters',
		},
	},
]
export const sampleContests = [
	{
		sampleId: 'contest_1',
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
		sampleId: 'contest_2',
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
		sampleId: 'user_1',
		email: 'user_1@example.com',
		password: 'password',
		userRole: 'default',
		username: 'Jack',
		contests: {
			contest_1: true,
		},
	},
	{
		sampleId: 'user_2',
		email: 'user_2@example.com',
		password: 'password',
		userRole: 'default',
		username: 'Jill',
		contests: {
			contest_1: true,
		},
	},
	{
		sampleId: 'user_3',
		email: 'user_3@example.com',
		password: 'password',
		userRole: 'default',
		username: 'Joe',
		contests: {
			contest_1: true,
		},
	},
	{
		sampleId: 'user_4',
		email: 'user_4@example.com',
		password: 'password',
		userRole: 'default',
		username: 'Jackie',
		contests: {
			contest_2: true,
		},
	},
	{
		sampleId: 'user_5',
		email: 'user_5@example.com',
		password: 'password',
		userRole: 'default',
		username: 'Rebecca',
		contests: {
			contest_2: true,
		},
	},
	{
		sampleId: 'user_6',
		email: 'user_6@example.com',
		password: 'password',
		userRole: 'default',
		username: 'Alejandro',
		contests: {
			contest_2: true,
		},
	},
	{
		sampleId: 'user_7',
		email: 'eat-2-petite@example.com',
		password: 'password',
		userRole: 'admin',
		username: 'EAT-2-PETITE',
		contests: {
			contest_1: true,
			contest_2: true,
		},
	},
]

export const sampleChallenges = [
	{
		sampleId: 'challenge_1',
		challengeName: 'Water Intake',
		description:
			'We should consume at least as much water as it takes to fill both of our shoes. We are like camels on the high dunes of the Sahara, high noon suns beckoning us to drink pure water today and tomorrow! No Money shall be vested in one supreme Court, and all other Powers vested by this Constitution in the Government and Regulation of the State Legislature.',
		formulaForTarget: `The person's weight multiplied by a constant. This constant will depend on the individual: are they a beginner? do they work outside or sweat a lot every day?`,
		units: 'volume',
	},
	{
		sampleId: 'challenge_2',
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
		sampleId: 'challenge_3',
		challengeName: 'Eat Protein',
		description:
			'We should aim for a target protein level every day for the goals we want to achieve. Our bodies are built from them!',
		formulaForTarget: `A person's weight multiplied by a constant. The constant may vary depending on the individual's needs.`,
		units: 'weight',
	},
	{
		sampleId: 'challenge_4',
		challengeName: 'Get Active!',
		description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
		formulaForTarget: 'Some amount of time spent on some scale of intensity',
		units: 'intensity',
		data: {
			intensities: ['light', 'medium', 'high'],
		},
	},
	{
		sampleId: 'challenge_5',
		challengeName: 'Manage Carbohydrate Intake',
		description:
			'Vary the sources of where you get your carbs! There are simple and complex carbohydrates. The simple ones are quickly converted to sugar and influence your body in a variety of negative ways when consumed as a main calorie source. We should aim to get the majority of our energy from the much more beneficial complex carbohydrates found in whole grains, fruit, and vegetables.',
		formulaForTarget: `The person's weight multiplied by some constant, adjusted by individual need.`,
		units: 'weight',
	},
	{
		sampleId: 'challenge_6',
		challengeName: 'Manage Sugar and Salt Intake',
		description:
			'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
		formulaForTarget: 'Some amount of weight per human',
		units: 'weight',
	},
]
