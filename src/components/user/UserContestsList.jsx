import React from 'react'
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap'
import { format } from 'date-fns'

import { useAuthUserContext } from '../../contexts/useAuthUserContext'

export default function UserContestsList(props) {
  const { user } = useAuthUserContext()
  const { setUserSelectedContest } = props
  const userContestsArray =
    user.contests && props.contests
      ? Object.keys(user.contests).map(
          (userContestsKey) => props.contests[userContestsKey],
        )
      : null
  return (
    <Container>
      <h2>Your Contests</h2>
      <div>
        {userContestsArray
          ? userContestsArray.map((contest, index) => {
              return (
                <Card key={index}>
                  <CardHeader>
                    <Button onClick={() => setUserSelectedContest(contest)}>
                      {contest.title}
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      {format(new Date(contest.startDate), 'PPP')}
                    </CardText>
                  </CardBody>
                </Card>
              )
            })
          : 'You are not enrolled in any contests.'}
      </div>
    </Container>
  )
}
