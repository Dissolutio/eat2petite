import React from 'react'
import { Container, Button, Card } from 'reactstrap'

export default function UserContestsList(props) {
  const { userEnrolledContests, setUserSelectedContest } = props

  return (
    <Container>
      <h2>Your Contests</h2>
      {userEnrolledContests
        ? userEnrolledContests.map((contest, index) => {
            return (
              <Card key={index}>
                <Button
                  color="primary"
                  onClick={() => setUserSelectedContest(contest)}>
                  {contest.title}
                </Button>
              </Card>
            )
          })
        : 'You are not enrolled in any contests.'}
    </Container>
  )
}
