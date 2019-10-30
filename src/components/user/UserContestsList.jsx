import React from 'react'
import { Container, Card, Button } from 'reactstrap'
import { UserContestDashboardLink } from '../layout/Links'

export default function UserContestsList(props) {
  const { userEnrolledContests, userSelectedContest } = props
  const currentUid = userSelectedContest && userSelectedContest.uid
  if (userEnrolledContests) {
    return (
      <Container>
        <h2>Your Contests</h2>
        {userEnrolledContests.map((contest, index) => (
          <Card key={index}>
            <UserContestDashboardLink contestId={contest.uid}>
              <Button color="primary" disabled={contest.uid === currentUid ? true : false}>
                Contest: {contest.title}
              </Button>
            </UserContestDashboardLink>
          </Card>
        )
        )}
      </Container>
    )
  }
  if (!userEnrolledContests) {
    return (
      <Container>
        <p>
          You are not enrolled in any contests.
        </p>
      </Container>
    )
  }
}
