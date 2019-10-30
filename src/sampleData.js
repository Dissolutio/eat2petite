import { format, addDays } from 'date-fns'
export const samplePosts = {
  '-LsQNoes1_JZsqVuG5Mz': {
    author: "MtAwR5hQ18SpTXI5wEjbkzx5pLE3",
    challengeId: "challenge1",
    checkedInBonus: true,
    contestId: "-LsQNkeDfSlA1Gql-XKM",
    createdAt: "Wed Oct 30 2019 01:38:42 GMT-0500 (Central Daylight Time)",
    lastEditedAt: "Wed Oct 30 2019 01:38:42 GMT-0500 (Central Daylight Time)",
    postDate: "10/30/2019",
    quantityDrank: 0,
    quantityDrankUnits: "cups",
    uid: "-LsQNoes1_JZsqVuG5Mz",
    userId: "MtAwR5hQ18SpTXI5wEjbkzx5pLE3",
  },
}
export const sampleChallenges = {
  challenge1: {
    challengeName: 'Water Challenge',
    uid: 'challenge1',
    description:
      'Staying well hydrated improves every facet of human functioning. Nothing hydrates you like pure water -- Drink up!',
    metric: 'volume',
    defaultMeasurementUnits: 'cups',
    defaultTarget: {
      quickDescription: 'Drink 8 cups of water a day.',
      quantityDrank: 8,
      quantityDrankUnits: 'cups',
    },
  },
  challenge2: {
    challengeName: 'Vegetable Challenge',
    uid: 'challenge2',
    description:
      'We benefit greatly from a large amount of vegetables in our diet. The abundance of micro-nutrients and fiber work wonders for health, and help us unlock our full potential.',
    defaultMeasurementUnits: `servings`,
    metric: 'amount',
    defaultTarget: {
      quickDescription: 'Eat 3 servings of vegetables a day, with at least one being a leafy green vegetable.',
      quantityLeafyGreens: 2,
      quantityNonLeafyGreens: 1,
      quantityUnits: 'servings',
    },
  },
  challenge3: {
    challengeName: 'Protein Challenge',
    uid: 'challenge3',
    description:
      'Consuming enough protein helps keep our muscles well fed. We are made of proteins after all!',
    metric: 'weight',
    defaultMeasurementUnits: 'grams',
    defaultTarget: {
      quickDescription: 'Try to eat 20 grams of protein each day.',
      quantityConsumed: 20,
      quantityConsumedUnits: 'grams',
    },
  },
  challenge4: {
    challengeName: 'Movement Challenge!',
    uid: 'challenge4',
    description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
    metric: 'time',
    defaultMeasurementUnits: 'minutes',
    intensities: ['light', 'medium', 'high'],
    defaultTarget: {
      excerciseUnits: 'minutes',
      quantitylightExcercise: 45,
      quantityMediumExcercise: 10,
      quantityHighExcercise: 0,
    }
  },
  challenge5: {
    challengeName: 'Carb Sources Challenge',
    uid: 'challenge5',
    description:
      'Vary the sources of where you get your carbs! There are simple and complex carbohydrates. The simple ones are quickly converted to sugar and influence your body in a variety of negative ways when consumed as a main calorie source. We should aim to get the majority of our energy from the much more beneficial complex carbohydrates found in whole grains, fruit, and vegetables.',
    metric: 'weight',
    defaultMeasurementUnits: 'grams',
    typesOfCarbohydrate: ['simple', 'complex'],
    defaultTarget: {
      quickDescription: '3 servings of whole-grain or complex carbs, 1 or less of refined or simple carbs',
      quantityUnits: 'servings',
      quantitySimple: 1,
      quantityComplex: 3,
    },
  },
  challenge6: {
    challengeName: `Sugar'n'Salt Challenge`,
    uid: 'challenge6',
    description:
      'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
    defaultMeasurementUnits: 'grams',
    metric: 'weight',
    defaultTarget: {
      quickDescription: '25 grams or less of sugar, 5 grams or less of salt',
      quantitySugarConsumed: 25,
      quantitySaltConsumed: 5,
      quantitySugarUnits: 'grams',
      quantitySaltConsumedUnits: 'grams',
    },
  },
}
export const sampleContests = {
  contest1: {
    title: 'The First Contest: 6 14-Day Challenges',
    startDate: format(addDays(new Date(), -9), 'P'),
    daysPerChallenge: '14',
    enrolledUsers: {},
    numberOfChallenges: 6,
    orderOfChallenges: {
      '0': 'challenge1',
      '1': 'challenge2',
      '2': 'challenge3',
      '3': 'challenge4',
      '4': 'challenge5',
      '5': 'challenge6',
    },
  },
  contest2: {
    title: 'The Old Contest: 6 2-Day Challenges',
    startDate: format(addDays(new Date(), -15), 'P'),
    daysPerChallenge: '2',
    enrolledUsers: {},
    numberOfChallenges: 6,
    orderOfChallenges: {
      '0': 'challenge1',
      '1': 'challenge2',
      '2': 'challenge3',
      '3': 'challenge4',
      '4': 'challenge5',
      '5': 'challenge6',
    },
  },
}
export const sampleUsers = {
  'MtAwR5hQ18SpTXI5wEjbkzx5pLE3': {
    email: 'user_1@example.com',
    userRole: 'default',
    uid: 'MtAwR5hQ18SpTXI5wEjbkzx5pLE3',
    username: 'JackieChan',
    firstName: 'Jack',
    lastName: 'Jones',
    userWeight: '200',
    userHeightFeet: '5',
    userHeightInches: '10',
  },
  '8A0KxSxtWJPhQ3slflHc8tgRiT52': {
    email: 'user_2@example.com',
    userRole: 'default',
    uid: '8A0KxSxtWJPhQ3slflHc8tgRiT52',
    username: 'JillPickle',
    firstName: 'Jill',
    lastName: 'Jones',
    userWeight: '120',
    userHeightFeet: '5',
    userHeightInches: '10',
  },
  'me9wM0JJs9QDAG390wu3CoQ9ayi2': {
    email: 'user_3@example.com',
    userRole: 'default',
    uid: 'me9wM0JJs9QDAG390wu3CoQ9ayi2',
    username: 'Joe',
    firstName: 'Joe',
    lastName: 'Jones',
    userWeight: '200',
    userHeightFeet: '5',
    userHeightInches: '10',
  },
  'iNgYAcuUyeVPO83DzReVtv6hWn03': {
    email: 'entity.john@gmail.com',
    userRole: 'admin',
    uid: 'iNgYAcuUyeVPO83DzReVtv6hWn03',
    username: 'dissolutio',
    firstName: 'John',
    lastName: 'Moen',
    userWeight: '140',
    userHeightFeet: '5',
    userHeightInches: '8',
  },
}

export const samplePublicUsers = {
  'MtAwR5hQ18SpTXI5wEjbkzx5pLE3': {
    userRole: 'default',
    uid: 'MtAwR5hQ18SpTXI5wEjbkzx5pLE3',
    username: 'JackieChan',
  },
  '8A0KxSxtWJPhQ3slflHc8tgRiT52': {
    userRole: 'default',
    uid: '8A0KxSxtWJPhQ3slflHc8tgRiT52',
    username: 'JillPickle',
  },
  'me9wM0JJs9QDAG390wu3CoQ9ayi2': {
    userRole: 'default',
    uid: 'me9wM0JJs9QDAG390wu3CoQ9ayi2',
    username: 'Joe',
  },
  'iNgYAcuUyeVPO83DzReVtv6hWn03': {
    userRole: 'admin',
    uid: 'iNgYAcuUyeVPO83DzReVtv6hWn03',
    username: 'dissolutio',
  },
}
