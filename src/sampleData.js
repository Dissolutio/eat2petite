export const samplePosts = [
	{
		postDate: '2019-09-11',
		postData: {
			quantity: '6.66',
			quantityUnits: 'cups',
		},
	},
	{
		postDate: '2019-09-12',
		postData: {
			quantity: '6.66',
			quantityUnits: 'liters',
		},
	},
	{
		postDate: '2019-09-13',
		postData: {
			quantity: '6.66',
			quantityUnits: 'cups',
		},
	},
	{
		postDate: '2019-09-14',
		postData: {
			quantity: '6.66',
			quantityUnits: 'ounces',
		},
	},
	{
		postDate: '2019-09-15',
		postData: {
			quantity: '3',
			quantityUnits: 'liters',
		},
	},
]
export const sampleContests = [
	{
		title: 'The First Contest: 6 2-Day Challenges',
		startDate: new Date(2019, 9, 20).toDateString(),
		daysPerChallenge: '2',
		uid: 'contest1',
		enrolledUsers: {},
		numberOfChallenges: 6,
		orderOfChallenges: {
			1: 'challenge1',
			2: 'challenge2',
			3: 'challenge3',
			4: 'challenge4',
			5: 'challenge5',
			6: 'challenge6',
		},
	},
	{
		title: 'The Second Contest: 6 14-Day Challenges',
		startDate: new Date(2019, 10, 1).toDateString(),
		daysPerChallenge: '3',
		uid: 'contest2',
		enrolledUsers: {},
		numberOfChallenges: 6,
		orderOfChallenges: {
			1: 'challenge1',
			2: 'challenge2',
			3: 'challenge3',
			4: 'challenge4',
			5: 'challenge5',
			6: 'challenge6',
		},
	},
]
export const sampleUsers = [
	{
		email: 'user_1@example.com',
		userRole: 'default',
		uid: 'user1',
		username: 'JackieChan',
		firstName: 'Jack',
		lastName: 'Jones',
		userWeight: '200',
		userHeightFeet: '5',
		userHeightInches: '10',
	},
	{
		email: 'user_2@example.com',
		userRole: 'default',
		uid: 'user2',
		username: 'JillPickle',
		firstName: 'Jill',
		lastName: 'Jones',
		userWeight: '100',
		userHeightFeet: '5',
		userHeightInches: '10',
	},
	{
		email: 'user_3@example.com',
		userRole: 'default',
		uid: 'user3',
		username: 'Joe',
		firstName: 'Joe',
		lastName: 'Jones',
		userWeight: '200',
		userHeightFeet: '5',
		userHeightInches: '10',
	},
	{
		email: 'entity.john@gmail.com',
		userRole: 'admin',
		uid: 'user4',
		username: 'dissolutio',
		firstName: 'John',
		lastName: 'Moen',
		userWeight: '140',
		userHeightFeet: '5',
		userHeightInches: '8',
	},
]

export const sampleChallenges = [
	{
		challengeName: 'Water Intake',
		uid: 'challenge1',
		description:
			'We should consume at least as much water as it takes to fill both of our shoes. We are like camels on the high dunes of the Sahara, high noon suns beckoning us to drink pure water today and tomorrow! No Money shall be vested in one supreme Court, and all other Powers vested by this Constitution in the Government and Regulation of the State Legislature.',
		units: 'volume',
		defaultTarget: { quantity: 8, units: 'cups' },
	},
	{
		challengeName: 'Eat Vegetables',
		uid: 'challenge',
		description:
			'Humans grew up as omnivores, and benefit greatly from a large amount of vegetables as a food source. The abundance of micro-nutrients and fiber work wonders for health, and help us unlock our full potential for physical and mental fitness.',
		units: [`servings`],
		typesOfVegetables: ['leafy-greens', 'non-green'],
	},
	{
		challengeName: 'Eat Protein',
		uid: 'challenge2',
		description:
			'We should aim for a target protein level every day for the goals we want to achieve. Our bodies are built from them!',
		units: 'weight',
	},
	{
		challengeName: 'Get Active!',
		uid: 'challenge3',
		description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
		units: 'intensity',
		intensities: ['light', 'medium', 'high'],
	},
	{
		challengeName: 'Manage Carbohydrate Intake',
		uid: 'challenge4',
		description:
			'Vary the sources of where you get your carbs! There are simple and complex carbohydrates. The simple ones are quickly converted to sugar and influence your body in a variety of negative ways when consumed as a main calorie source. We should aim to get the majority of our energy from the much more beneficial complex carbohydrates found in whole grains, fruit, and vegetables.',
		units: 'weight',
		typesOfCarbohydrate: ['simple', 'complex'],
	},
	{
		challengeName: 'Manage Sugar and Salt Intake',
		uid: 'challenge5',
		description:
			'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
		units: 'weight',
	},
]
