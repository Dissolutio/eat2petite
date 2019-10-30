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
    challengeName: 'Water Intake',
    uid: 'challenge1',
    description:
      'We should consume at least as much water as it takes to fill both of our shoes.',
    units: 'volume',
    defaultTarget: { quantityDrank: 8, quantityDrankUnits: 'cups' },
  },
  challenge2: {
    challengeName: 'Eat Vegetables',
    uid: 'challenge2',
    description:
      'Humans grew up as omnivores, and benefit greatly from a large amount of vegetables as a food source. The abundance of micro-nutrients and fiber work wonders for health, and help us unlock our full potential for physical and mental fitness.',
    units: [`servings`],
    typesOfVegetables: ['leafy-greens', 'non-green'],
  },
  challenge3: {
    challengeName: 'Eat Protein',
    uid: 'challenge3',
    description:
      'We should aim for a target protein level every day for the goals we want to achieve. Our bodies are built from them!',
    units: 'weight',
  },
  challenge4: {
    challengeName: 'Get Active!',
    uid: 'challenge4',
    description: `Our bodies are made to be active! Boost your health by USING your health. How much time and how much intensity can you give to your body? Everyone has a different situation, but we all face the same challenge of taking the time to get in motion!`,
    units: 'intensity',
    intensities: ['light', 'medium', 'high'],
  },
  challenge5: {
    challengeName: 'Manage Carbohydrate Intake',
    uid: 'challenge5',
    description:
      'Vary the sources of where you get your carbs! There are simple and complex carbohydrates. The simple ones are quickly converted to sugar and influence your body in a variety of negative ways when consumed as a main calorie source. We should aim to get the majority of our energy from the much more beneficial complex carbohydrates found in whole grains, fruit, and vegetables.',
    units: 'weight',
    typesOfCarbohydrate: ['simple', 'complex'],
  },
  challenge6: {
    challengeName: 'Manage Sugar and Salt Intake',
    uid: 'challenge6',
    description:
      'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
    units: 'weight',
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
