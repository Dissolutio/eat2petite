import {
    isAfter,
    addDays,
    eachDayOfInterval,
} from 'date-fns'

export function sortByMostCurrentStartDate(a, b) {
    if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
        return -1
    } else {
        return 1
    }
}

export function calculateContestData(userSelectedContest) {
    const { daysPerChallenge, numberOfChallenges } = userSelectedContest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(userSelectedContest.startDate)
    const contestEndDate = new Date(addDays(contestStartDate, contestLengthInDays))
    const allContestDays = eachDayOfInterval({
        start: contestStartDate,
        end: contestEndDate,
    })
    return { contestLengthInDays, contestStartDate, contestEndDate, allContestDays }
}