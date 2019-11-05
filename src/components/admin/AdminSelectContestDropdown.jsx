import React from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AdminContestDashboardLink } from '../layout/Links'

export default function AdminSelectContestDropdown(props) {
    const [dropdownOpen, setOpen] = React.useState(false);
    const { contests, userSelectedContest } = props
    const toggle = () => setOpen(!dropdownOpen);
    const selectableContests = Object.values(contests).filter(contest => contest.uid !== userSelectedContest.uid)
    return (
        <ButtonDropdown className='btn-block' isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {userSelectedContest.title}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Choose a different contest:</DropdownItem>
                {selectableContests.map(contest => {
                    return (
                        <DropdownItem key={contest.uid}><AdminContestDashboardLink contestId={contest.uid}>{contest.title}</AdminContestDashboardLink></DropdownItem>
                    )
                }
                )}
            </DropdownMenu>
        </ButtonDropdown>
    );
}