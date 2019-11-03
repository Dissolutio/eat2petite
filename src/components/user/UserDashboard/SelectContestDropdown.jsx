import React from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { UserContestDashboardLink } from '../../layout/Links'

export function SelectContestDropdown(props) {
    const [dropdownOpen, setOpen] = React.useState(false);
    const { userEnrolledContests, userSelectedContest } = props
    const toggle = () => setOpen(!dropdownOpen);
    const selectableContests = userEnrolledContests.filter(contest => contest.uid !== userSelectedContest.uid)
    return (
        <ButtonDropdown className='btn-block' isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {userSelectedContest.title}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Choose a different contest:</DropdownItem>
                {selectableContests.map(contest => {
                    return (
                        <DropdownItem key={contest.uid}><UserContestDashboardLink contestId={contest.uid}>{contest.title}</UserContestDashboardLink></DropdownItem>
                    )
                }
                )}
            </DropdownMenu>
        </ButtonDropdown>
    );
}