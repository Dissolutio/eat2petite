import { format, addDays } from 'date-fns'

export const samplePosts = {
  post1: {
    uid: 'post1',
    postDate: '2019-09-11',
    postData: {
      quantity: '6.66',
      quantityUnits: 'cups',
    },
  },
  post2: {
    uid: 'post2',
    postDate: '2019-09-12',
    postData: {
      quantity: '6.66',
      quantityUnits: 'liters',
    },
  },
  post3: {
    uid: 'post3',
    postDate: '2019-09-13',
    postData: {
      quantity: '6.66',
      quantityUnits: 'cups',
    },
  },
  post4: {
    uid: 'post4',
    postDate: '2019-09-14',
    postData: {
      quantity: '6.66',
      quantityUnits: 'ounces',
    },
  },
  post5: {
    uid: 'post5',
    postDate: '2019-09-15',
    postData: {
      quantity: '3',
      quantityUnits: 'liters',
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
      '1': 'challenge1',
      '2': 'challenge2',
      '3': 'challenge3',
      '4': 'challenge4',
      '5': 'challenge5',
      '6': 'challenge6',
    },
  },
  contest2: {
    title: 'The Old Contest: 6 2-Day Challenges',
    startDate: format(addDays(new Date(), -15), 'P'),
    daysPerChallenge: '2',
    enrolledUsers: {},
    numberOfChallenges: 6,
    orderOfChallenges: {
      '1': 'challenge1',
      '2': 'challenge2',
      '3': 'challenge3',
      '4': 'challenge4',
      '5': 'challenge5',
      '6': 'challenge6',
    },
  },
}
export const sampleUsers = {
  MtAwR5hQ18SpTXI5wEjbkzx5pLE3: {
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
  me9wM0JJs9QDAG390wu3CoQ9ayi2: {
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
  iNgYAcuUyeVPO83DzReVtv6hWn03: {
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

export const sampleChallenges = {
  challenge1: {
    challengeName: 'Water Intake',
    uid: 'challenge1',
    description:
      'We should consume at least as much water as it takes to fill both of our shoes.',
    units: 'volume',
    defaultTarget: { quantity: 8, units: 'cups' },
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
export const samplePublicUsers = {
  MtAwR5hQ18SpTXI5wEjbkzx5pLE3: {
    userRole: 'default',
    uid: 'MtAwR5hQ18SpTXI5wEjbkzx5pLE3',
    username: 'JackieChan',
  },
  '8A0KxSxtWJPhQ3slflHc8tgRiT52': {
    userRole: 'default',
    uid: '8A0KxSxtWJPhQ3slflHc8tgRiT52',
    username: 'JillPickle',
  },
  me9wM0JJs9QDAG390wu3CoQ9ayi2: {
    userRole: 'default',
    uid: 'me9wM0JJs9QDAG390wu3CoQ9ayi2',
    username: 'Joe',
  },
  iNgYAcuUyeVPO83DzReVtv6hWn03: {
    userRole: 'admin',
    uid: 'iNgYAcuUyeVPO83DzReVtv6hWn03',
    username: 'dissolutio',
  },
}
