import React from 'react'
import { Container, Button } from 'reactstrap'
import {
    format,
    eachDayOfInterval,
    addDays,
    differenceInDays,
    isSameDay,
} from 'date-fns'
import { useDataContext } from '../../../contexts/useDataContext'
import { UserDashboardCalendar } from './UserDashboardCalendar'
import WaterChallengePostForm from '../WaterChallengePostForm'
import { random } from 'lodash'
import { calculateContestData } from './utils'


export default (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const { appData, createUserPost, loadFirebaseData } = useDataContext()
    const { posts, me } = appData
    const { userSelectedContest } = props
    const { daysPerChallenge, numberOfChallenges } = userSelectedContest
    const { contestLengthInDays, contestStartDate, contestEndDate, allContestDays } = calculateContestData(userSelectedContest)
    const postsArray = posts && Object.values(posts).filter(post => post.contestId === userSelectedContest.uid)
    const getPostForDay = (date) => {
        return postsArray && postsArray.find(post => isSameDay(new Date(post.postDate), new Date(selectedDate)))
    }
    console.log("TCL: getPostForDay -> getPostForDay", getPostForDay())
    const daysStartToPostDate = differenceInDays(
        selectedDate,
        contestStartDate,
    )
    const getChallengeForDay = () => {
        console.log("TCL: getChallengeForDay -> daysStartToPostDate", daysStartToPostDate)
        return daysStartToPostDate
    }
    return (
        <>
            <UserDashboardCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                startDate={contestStartDate}
            />
            <WaterChallengePostForm
                userSelectedContest={userSelectedContest}
                selectedDate={format(new Date(selectedDate), 'yyyy-MM-dd')}
                setSelectedDate={setSelectedDate}
                contestStartDate={contestStartDate}
                contestEndDate={contestEndDate}
            />
        </>
    )
}