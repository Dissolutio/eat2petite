import { addDays } from 'date-fns'

export function adaptContestData(contest) {
    const { daysPerChallenge, numberOfChallenges } = contest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(contest.startDate)
    const contestEndDate = new Date(addDays(contestStartDate, contestLengthInDays - 1))
    return { ...contest, contestLengthInDays, contestStartDate, contestEndDate }
}