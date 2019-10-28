import React from 'react'
import { Container, Card } from 'reactstrap'
import { UserContestDashboardLink } from '../layout/Links'

export default function UserContestsList(props) {
  const { userEnrolledContests } = props

  if (userEnrolledContests) {
    return (
      <Container>
        <h2>Your Contests</h2>
        {userEnrolledContests.map((contest, index) => (
          <Card key={index}>
            <UserContestDashboardLink contestId={contest.uid}>
              Contest: {contest.title}
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
