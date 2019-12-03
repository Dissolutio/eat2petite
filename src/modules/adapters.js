import { format, addDays, differenceInCalendarDays } from 'date-fns'

export function addCalculatedContestDataTo(snapshotVal) {
    if (!snapshotVal) { return {} }
    return Object.entries(snapshotVal).reduce((finalContests, entry) => {
        const uid = entry[0]
        const contest = entry[1]
        const newContest = adaptContest(contest)
        return {
            ...finalContests,
            [uid]: newContest,
        }
    }, {})
    function adaptContest(contest) {
        const { daysPerChallenge, numberOfChallenges, orderOfChallenges } = contest
        const contestLengthInDays = daysPerChallenge * numberOfChallenges
        const contestStartDate = new Date(contest.startDate)
        const endDate = format(new Date(addDays(contestStartDate, contestLengthInDays - 1)), 'P')
        function getChallengeForDate(date) {
            const contestDay = differenceInCalendarDays(date, contestStartDate)
            const order = Math.floor(contestDay / daysPerChallenge)
            return orderOfChallenges[order]
        }
        return { ...contest, contestLengthInDays, endDate, getChallengeForDate }
    }
}