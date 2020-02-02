import React from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default function SelectContestDropdown(props) {
  const { contests, selectedContest, setSelectedContestId } = props
  const [dropdownOpen, setOpen] = React.useState(false)
  const toggle = () => setOpen(!dropdownOpen)
  const selectableContests = contests && selectedContest && contests.filter(contest => {
    return contest.uid !== selectedContest.uid
  })
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
              onClick={() => setSelectedContestId(contest.uid)}>
              {contest.title}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </ButtonDropdown>
  )
}
