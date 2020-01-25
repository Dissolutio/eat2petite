import { format, addDays, differenceInCalendarDays } from 'date-fns'

export function adaptContests(snapshotVal) {
    if (!snapshotVal) { return {} }
    return Object.entries(snapshotVal).reduce(toTransformedContests, {})
}
function toTransformedContests(previous, current, index, arr) {
    const uid = current[0]
    const contest = current[1]
    const newContest = transformContest(contest)
    previous[uid] = newContest
    return previous
}
function transformContest(contest) {
    const { daysPerChallenge, numberOfChallenges, orderOfChallenges } = contest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(contest.startDate)
    const endDate = format(new Date(addDays(contestStartDate, contestLengthInDays - 1)), 'P')
    function getChallengeForDate(date) {
        const contestDay = differenceInCalendarDays(date, contestStartDate)
        const order = Math.floor(contestDay / daysPerChallenge)
        return orderOfChallenges[order]
    }
    return {
        ...contest,
        contestLengthInDays,
        endDate,
        getChallengeForDate,
    }
}