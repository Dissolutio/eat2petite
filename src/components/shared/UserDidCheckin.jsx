import React from 'react'
import { Badge } from 'reactstrap'
const UserDidCheckin = ({ checkedInBonus }) => {
    return (
        <div>
            {checkedInBonus ?
                <Badge style={{ backgroundColor: "var(--E2P-orange" }} pill>Checked-in! +2</Badge>
                : null}
        </div>
    )
}
export default UserDidCheckin