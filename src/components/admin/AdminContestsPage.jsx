import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import { AdminContestDetailLink, AdminCreateContestLink } from '../navigation/Links'

export default function AdminContestsPage({ contests, users, challenges }) {
  return (
    <>
      <AdminContestsList contests={contests} />
      <AdminCreateContestLink>
        <Button color='primary'>Create New Contest</Button>
      </AdminCreateContestLink>
    </>
  )
}
function AdminContestsList(props) {
  const { contests } = props
  return contests ? (
    <ListGroup>
      <h3>Contests:</h3>
      {contests &&
        Object.keys(contests).map((contestKey) => {
          const contest = contests[contestKey]
          const { uid, title } = contest
          return (
            <ListGroupItem key={contestKey}>
              <AdminContestDetailLink contestId={uid}>
                {title}
              </AdminContestDetailLink>
            </ListGroupItem>
          )
        })}
    </ListGroup>
  ) : (
      <p>No Contests Found</p>
    )
}
