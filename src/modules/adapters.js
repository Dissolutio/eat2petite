import { format, addDays } from 'date-fns'

export function adaptContestData(contest) {
    const { daysPerChallenge, numberOfChallenges } = contest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(contest.startDate)
    const endDate = format(new Date(addDays(contestStartDate, contestLengthInDays - 1)), 'P')
    return { ...contest, contestLengthInDays, endDate }
}