import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import { useRealtimeDataContext } from 'contexts/useRealtimeDataContext'
import { AdminContestDetailLink, AdminCreateContestLink } from '../navigation/Links'

export default function AdminContestsPage() {
  const { appData } = useRealtimeDataContext()
  const { contests } = appData
  return (
    <>
      <AdminContestsList contests={contests} />
      <AdminCreateContestLink>
        <Button color='primary'>Create New Contest</Button>
      </AdminCreateContestLink>
    </>
  )
}

function AdminContestsList({ contests }) {
  if (!contests) {
    return (<p>No Contests Found</p>)
  }
  return (
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
  )
}
