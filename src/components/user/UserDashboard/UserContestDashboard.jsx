import React from 'react'
import { Container, Button } from 'reactstrap'
import {
    format,
    eachDayOfInterval,
    addDays,
    isAfter,
    differenceInDays,
    isSameDay,
} from 'date-fns'
import { useDataContext } from '../../../contexts/useDataContext'
import { UserDashboardCalendar } from './UserDashboardCalendar'
import UserContestsList from '../UserContestsList'
import WaterChallengePostForm from '../WaterChallengePostForm'
import { random } from 'lodash'
import { calculateContestData } from './utils'


export default (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const { appData, createUserPost } = useDataContext()
    const { posts, me } = appData
    const { userSelectedContest } = props
    const { daysPerChallenge, numberOfChallenges } = userSelectedContest
    const { contestLengthInDays, contestStartDate, contestEndDate, allContestDays } = calculateContestData(userSelectedContest)
    const postsArray = Object.values(posts).filter(post => post.contestId === userSelectedContest.uid)
    const getPostForDay = (date) => {
        return postsArray.filter(post => isSameDay(new Date(post.postDate), new Date(selectedDate)))
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
    const handlePostsButtonClick = (event) => {
        console.log(event.target)
        const dateInterval = eachDayOfInterval({ start: new Date(userSelectedContest.startDate), end: new Date(format(addDays(new Date(), -1), 'P')) })
        dateInterval.forEach(dateToPost => {
            let newPost = {
                author: me.uid,
                userId: me.uid,
                createdAt: (new Date()).toString(),
                postDate: format(dateToPost, 'P'),
                contestId: userSelectedContest.uid,
                quantityDrank: random(1, 10),
                quantityDrankUnits: 'cups',
            }
            console.log("TCL: handlePostsButtonClick -> newPost", newPost)
            createUserPost(newPost)
        })
    }
    return (
        <>
            <UserDashboardCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                startDate={contestStartDate}
            />
            <Button
                onClick={handlePostsButtonClick}
                color="warning"
                block
                size="lg">
                Make Posts
    </Button>
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