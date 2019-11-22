import React from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function SelectContestDropdown(props) {
    const [dropdownOpen, setOpen] = React.useState(false);
    const { contests, userSelectedContest, handleSelectedContestChange } = props
    const toggle = () => setOpen(!dropdownOpen);
    const selectableContests = contests.filter(contest => contest.uid !== userSelectedContest.uid)
    return (
        <ButtonDropdown className='btn-block' isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color='primary' caret>
                {userSelectedContest.title}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Choose a different contest:</DropdownItem>
                {selectableContests.map(contest => {
                    return (
                        <DropdownItem
                            key={contest.uid}
                            onClick={() => handleSelectedContestChange(contest)}
                        >
                            {contest.title}
                        </DropdownItem>
                    )
                }
                )}
            </DropdownMenu>
        </ButtonDropdown>
    );
}