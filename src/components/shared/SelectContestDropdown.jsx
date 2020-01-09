import React from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default function SelectContestDropdown(props) {
  const [dropdownOpen, setOpen] = React.useState(false)
  const { contests, userSelectedContest, handleSelectedContestChange } = props
  const toggle = () => setOpen(!dropdownOpen)
  const selectableContests = contests.filter(
    (contest) => contest.uid !== userSelectedContest.uid,
  )
  if (!selectableContests) {
    return null
  }
  return (
    <ButtonDropdown
      style={{
        maxWidth: '500px',
      }}
      isOpen={dropdownOpen}
      size='sm'
      toggle={toggle}>
      <DropdownToggle caret>Choose another contest</DropdownToggle>
      <DropdownMenu>
        {selectableContests.map((contest) => {
          return (
            <DropdownItem
              key={contest.uid}
              onClick={() => handleSelectedContestChange(contest)}>
              {contest.title}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </ButtonDropdown>
  )
}
