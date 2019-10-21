import React from 'react'
import { Container, Button } from 'reactstrap'
import {
  format,
  eachDayOfInterval,
  addDays,
  isAfter,
  differenceInDays,
} from 'date-fns'
import { useDataContext } from '../../../contexts/useDataContext'
import { useAuthUserContext } from '../../../contexts/useAuthUserContext'
import { UserDashboardCalendar } from './UserDashboardCalendar'
import UserContestsList from '../UserContestsList'
import WaterChallengePostForm from '../WaterChallengePostForm'
import { random } from 'lodash'

function sortByMostCurrentStartDate(a, b) {
  if (isAfter(new Date(a.startDate), new Date(b.startDate))) {
    return -1
  } else {
    return 1
  }
}
export const UserDashboard = (props) => {
  const [userSelectedContest, setUserSelectedContest] = React.useState()
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [hasFiredAutoSelect, setHasFiredAutoSelect] = React.useState(false)

  const { appData, createUserPost } = useDataContext()
  const { contests, posts, me } = appData
  const { contestChosen } = props
  const userEnrolledContests =
    me.contests &&
    Object.keys(me.contests).map((contestKey) => contests[contestKey])
  if (contestChosen && !hasFiredAutoSelect) {
    setHasFiredAutoSelect(true)
    setUserSelectedContest(contestChosen)
  }

  const sortedByMostRecent = userEnrolledContests && [
    ...userEnrolledContests.sort(sortByMostCurrentStartDate),
  ]
  const autoSelectedContest = userEnrolledContests && sortedByMostRecent[0]

  if (autoSelectedContest && !hasFiredAutoSelect && !contestChosen) {
    setHasFiredAutoSelect(true)
    setUserSelectedContest(autoSelectedContest)
  }
  if (userSelectedContest) {
    const { daysPerChallenge, numberOfChallenges } = userSelectedContest
    const contestLengthInDays = daysPerChallenge * numberOfChallenges
    const contestStartDate = new Date(userSelectedContest.startDate)
    const contestEndDate = new Date(
      addDays(contestStartDate, contestLengthInDays),
    )
    const getPostForDay = () => {
      return
    }
    const allContestDays = eachDayOfInterval({
      start: contestStartDate,
      end: contestEndDate,
    })
    const challengeForDay = () => {
      const daysStartToPostDate = differenceInDays(
        selectedDate,
        contestStartDate,
      )
      return daysStartToPostDate
    }
    const handlePostsButtonClick = (event) => {
      console.log(event.target)
      const dateInterval = eachDayOfInterval({ start: new Date(userSelectedContest.startDate), end: new Date(format(addDays(new Date(), -1), 'P')) })
      dateInterval.forEach(dateToPost => {
        let newPost = {
          author: me.uid,
          userId: me.uid,
          createdAt: new Date(),
          postDate: dateToPost,
          contestId: userSelectedContest.uid,
          postData: {
            quantity: random(1, 10),
            quantityUnits: 'cups',
          },
        }
        console.log("TCL: handlePostsButtonClick -> newPost.postData.quantity", newPost.postData.quantity)
        // createUserPost(newPost)
      })
    }
    return (
      <Container>
        {userSelectedContest && (
          <UserDashboardCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            startDate={contestStartDate}
            endDate={contestEndDate}
          />
        )}
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
        <UserContestsList
          userEnrolledContests={userEnrolledContests}
          setUserSelectedContest={setUserSelectedContest}
        />
      </Container>
    )
  }
  return (
    <Container className="text-center">
      <h1 className="text-center">User Dashboard</h1>
      <hr />
      <UserContestsList contests={contests} />
    </Container>
  )
}
