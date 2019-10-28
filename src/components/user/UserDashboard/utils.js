import {
    format,
    isAfter,
    addDays,
    eachDayOfInterval,
    differenceInDays,
    isSameDay,
} from 'date-fns'
export function sortByMostCurrentStartDate(a, b) {
    if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
        return -1
    } else {
        return 1
    }
}

export function calculateContestData(userSelectedContest, postsArray) {
    const { daysPerChallenge, numberOfChallenges } = userSelectedContest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(userSelectedContest.startDate)
    const contestEndDate = new Date(addDays(contestStartDate, contestLengthInDays - 1))
    const allContestDays = eachDayOfInterval({
        start: contestStartDate,
        end: contestEndDate,
    })

    function getPostsForInterval(arrayOfDates) {
        return arrayOfDates.map(date => {
            const postForDate = postsArray.find(post => isSameDay(new Date(post.postDate), new Date(date)))
            return {
                postDate: date,
                userPost: postForDate
            }
        })
    }
    function getChallengesForInterval(arrayOfDatePostObjects) {
        return arrayOfDatePostObjects.map(datePostObject => {
            const daysStartToPostDate = differenceInDays(
                datePostObject.postDate,
                contestStartDate,
            )
            const orderInChallenge = Math.floor(daysStartToPostDate / daysPerChallenge)
            return {
                ...datePostObject,
                orderInChallenge,
            }

        })
    }
    const datePostObjects = getChallengesForInterval(getPostsForInterval(allContestDays))

    return { contestLengthInDays, contestStartDate, contestEndDate, allContestDays, datePostObjects }
}