// 2 contests, 6 users, 6 challenges, 4 posts, and a 7th user who is the admin
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
		enrolledUsers: {},
		numberOfChallenges: 6,
		challenges: {
		},
	},
	{
		title: 'The Second Contest: 6 14-Day Challenges',
		startDate: new Date(2019, 10, 1).toDateString(),
		daysPerChallenge: '3',
		enrolledUsers: {},
		numberOfChallenges: 6,
		challenges: {
		},
	},
]
export const sampleUsers = [
	{
		email: 'user_1@example.com',
		userRole: 'default',
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
		username: 'Joe',
		firstName: 'Joe',
		lastName: 'Jones',
		userWeight: '200',
		userHeightFeet: '5',
		userHeightInches: '10',
	},
	{
		email: 'user_4@example.com',
		userRole: 'default',
		username: 'Joanna',
		firstName: 'Joanna',
		lastName: 'Jones',
		userWeight: '200',
		userHeightFeet: '5',
		userHeightInches: '10',
	},
	{
		email: 'user_5@example.com',
		userRole: 'default',
		username: 'Rebecca',
	},
	{
		email: 'user_6@example.com',
		userRole: 'default',
		username: 'Alejandro',
	},
	{
		email: 'eat-2-petite@example.com',
		userRole: 'admin',
		username: 'EAT-2-PETITE',
	},
]

export const sampleChallenges = [
	{
		challengeName: 'Water Intake',
		description:
			'We should consume at least as much water as it takes to fill both of our shoes. We are like camels on the high dunes of the Sahara, high noon suns beckoning us to drink pure water today and tomorrow! No Money shall be vested in one supreme Court, and all other Powers vested by this Constitution in the Government and Regulation of the State Legislature.',
		formulaForTarget: `The person's weight multiplied by a constant. This constant will depend on the individual: are they a beginner? do they work outside or sweat a lot every day?`,
		units: 'volume',
	},
	{
		challengeName: 'Eat Vegetables',
		description:
			'Humans grew up as omnivores, and benefit greatly from a large amount of vegetables as a food source. The abundance of micro-nutrients and fiber work wonders for health, and help us unlock our full potential for physical and mental fitness.',
		formulaForTarget: `5 servings a day, adjusted to the individual's situation or goal`,
		units: [`servings`],
		typesOfVegetables: ['leafy-greens', 'non-green'],
	},
	{
		challengeName: 'Eat Protein',
		description:
			'We should aim for a target protein level every day for the goals we want to achieve. Our bodies are built from them!',
		formulaForTarget: `A person's weight multiplied by a constant. The constant may vary depending on the individual's needs.`,
		units: 'weight',
	},
	{
		challengeName: 'Get Active!',
		description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
		formulaForTarget: 'Some amount of time spent on some scale of intensity',
		units: 'intensity',
		intensities: ['light', 'medium', 'high'],
	},
	{
		challengeName: 'Manage Carbohydrate Intake',
		description:
			'Vary the sources of where you get your carbs! There are simple and complex carbohydrates. The simple ones are quickly converted to sugar and influence your body in a variety of negative ways when consumed as a main calorie source. We should aim to get the majority of our energy from the much more beneficial complex carbohydrates found in whole grains, fruit, and vegetables.',
		formulaForTarget: `The person's weight multiplied by some constant, adjusted by individual need.`,
		units: 'weight',
		typesOfCarbohydrate: ['simple', 'complex'],
	},
	{
		challengeName: 'Manage Sugar and Salt Intake',
		description:
			'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
		formulaForTarget: 'Some amount of weight per human',
		units: 'weight',
	},
]
