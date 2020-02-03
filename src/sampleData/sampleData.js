import { format, addDays } from 'date-fns'

const samplePost = {
  '-LsQNoes1_JZsqVuG5Mz': {
    uid: "-LsQNoes1_JZsqVuG5Mz",
    author: "MtAwR5hQ18SpTXI5wEjbkzx5pLE3",
    challengeId: "challenge1",
    checkedInBonus: true,
    contestId: "-LsQNkeDfSlA1Gql-XKM",
    createdAt: "Wed Oct 30 2019 01:38:42 GMT-0500 (Central Daylight Time)",
    lastEditedAt: "Wed Oct 30 2019 01:38:42 GMT-0500 (Central Daylight Time)",
    userId: "MtAwR5hQ18SpTXI5wEjbkzx5pLE3",
    postDate: "10/30/2019",
    targets: {
      challenge1: {
        quantityWaterDrank: 0,
        quantityWaterDrankUnits: "cups",
      },
      challenge2: {
        servingsVegetablesEaten: 0,
      },
      challenge3: {
        proteinConsumed: 0,
        proteinConsumedUnits: 'grams',
      },
      challenge4: {
        excerciseUnits: 'minutes',
        lightExcerciseDuration: 0,
        mediumExcerciseDuration: 0,
        heavyExcerciseDuration: 0,
      },
      challenge5: {
        refinedCarbsConsumed: 0,
        refinedCarbsConsumedUnits: 'calories',
      },
      challenge6: {
        quantitySugarConsumed: 0,
        quantitySaltConsumed: 0,
        quantitySugarConsumedUnits: 'grams',
        quantitySaltConsumedUnits: 'grams',
      },
    },
    data: {
      challenge1: {
        quantityWaterDrank: 0,
        quantityWaterDrankUnits: "cups",
      },
      challenge2: {
        servingsVegetablesEaten: 0,
      },
      challenge3: {
        proteinConsumed: 0,
        proteinConsumedUnits: 'grams',
      },
      challenge4: {
        excerciseUnits: 'minutes',
        lightExcerciseDuration: 0,
        mediumExcerciseDuration: 0,
        heavyExcerciseDuration: 0,
      },
      challenge5: {
        refinedCarbsConsumed: 0,
        refinedCarbsConsumedUnits: 'calories',
      },
      challenge6: {
        quantitySugarConsumed: 0,
        quantitySaltConsumed: 0,
        quantitySugarConsumedUnits: 'grams',
        quantitySaltConsumedUnits: 'grams',
      },
    }
  },
}
const sampleChallenges = {
  challenge1: {
    challengeName: 'Water Challenge',
    uid: 'challenge1',
    description:
      'Staying well hydrated improves every facet of human functioning. Nothing hydrates you like pure water -- Drink up!',
    metric: 'volume',
    defaultMeasurementUnits: 'cups',
    defaultTargetQuickDescription: 'Drink 8 cups of water a day.',
    defaultTarget: {
      quantityWaterDrank: 8,
      quantityWaterDrankUnits: 'cups',
    },
  },
  challenge2: {
    challengeName: 'Vegetable Challenge',
    uid: 'challenge2',
    description:
      'We benefit greatly from a large amount of vegetables in our diet. The abundance of micro-nutrients and fiber work wonders for health, and help us unlock our full potential.',
    defaultMeasurementUnits: `servings`,
    metric: 'amount',
    defaultTargetQuickDescription: 'Try and eat 3-5 servings of vegetables a day.',
    defaultTarget: {
      servingsVegetablesEaten: 3,
    },
  },
  challenge3: {
    challengeName: 'Protein Challenge',
    uid: 'challenge3',
    description:
      'Consuming enough protein helps keep our muscles well fed. We are made of proteins after all!',
    metric: 'weight',
    defaultMeasurementUnits: 'grams',
    defaultTargetQuickDescription: 'Try to eat 20 grams of protein each day.',
    defaultTarget: {
      proteinConsumed: 20,
      proteinConsumedUnits: 'grams',
    },
  },
  challenge4: {
    challengeName: 'Movement Challenge!',
    uid: 'challenge4',
    description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
    metric: 'time',
    defaultMeasurementUnits: 'minutes',
    intensities: ['light', 'medium', 'heavy'],
    defaultTargetQuickDescription: 'Aim to get at least 60 minutes of light exercise, or 30 minutes of medium excercise every day.',
    defaultTarget: {
      excerciseDurationUnits: 'minutes',
      lightExcerciseDuration: 45,
      mediumExcerciseDuration: 10,
      heavyExcerciseDuration: 0,
    }
  },
  challenge5: {
    challengeName: 'Carbohydrate Challenge',
    uid: 'challenge5',
    description:
      'Heavily processed and refined flours offer plenty of energy with not enough vitamins, minerals, or fiber. Try to limit how much of your calories come from simple and refined carbohydrates.',
    metric: 'calories',
    defaultMeasurementUnits: 'calories',
    defaultTargetQuickDescription: 'Consume less than 400 calories from refined foods.',
    defaultTarget: {
      refinedCarbsConsumed: 400,
      refinedCarbsConsumedUnits: 'calories',
    },
  },
  challenge6: {
    challengeName: `Sugar'n'Salt Challenge`,
    uid: 'challenge6',
    description:
      'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
    defaultMeasurementUnits: 'grams',
    metric: 'weight',
    defaultTargetQuickDescription: '25 grams or less of sugar, 5 grams or less of salt',
    defaultTarget: {
      quantitySugarConsumed: 25,
      quantitySaltConsumed: 5,
      quantitySugarConsumedUnits: 'grams',
      quantitySaltConsumedUnits: 'grams',
    },
  },
}
const sampleContests = {
  contest1: {
    title: 'Eat-2-Petite Launch Contest',
    startDate: format(addDays(new Date(), -8), 'P'),
    uid: '-Lth91Tw1gaKMMbwFe54',
    daysPerChallenge: '3',
    enrolledUsers: {},
    numberOfChallenges: 6,
    orderOfChallenges: {
      '0': 'challenge2',
      '1': 'challenge1',
      '2': 'challenge3',
      '3': 'challenge4',
      '4': 'challenge5',
      '5': 'challenge6',
    },
  },
  contest2: {
    title: 'Fall Mini Contest ',
    startDate: format(addDays(new Date(), -6), 'P'),
    uid: '-Lth91Tw1gaKMMbwFe55',
    daysPerChallenge: '1',
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
const sampleUsers = {
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
const samplePublicUsers = {
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
export {
  samplePost,
  sampleChallenges,
  sampleContests,
  sampleUsers,
  samplePublicUsers
}