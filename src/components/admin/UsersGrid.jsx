import React from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components'

import { lastInitial } from '../../helpers'

export default function UsersGrid(props) {
  const {
    enrolledUsersArray,
    usersPostForSelectedDate,
    setViewingUserId,
  } = props
  const StarForCheckinBonus = () => {
    return usersPostForSelectedDate && usersPostForSelectedDate.checkedInBonus ?
      `\u2605`
      : null
  }
  const UserFullName = ({ user }) => {
    return `${user.firstName} ${lastInitial(user.lastName)}`
  }
  return (
    <UsersGridStyle>
      {enrolledUsersArray &&
        enrolledUsersArray.map((user) => {
          return (
            <Button
              key={user.uid}
              style={{ backgroundColor: 'var(--E2P-orange)' }}
              onClick={() => setViewingUserId(user.uid)}>
              <h6>
                <StarForCheckinBonus />
                <UserFullName user={user} />
              </h6>
            </Button>
          )
        })}
    </UsersGridStyle>
  )
}
const UsersGridStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
`
