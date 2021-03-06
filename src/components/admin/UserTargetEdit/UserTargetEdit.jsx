import React from 'react'
import { Container } from 'reactstrap'

import { UserWaterTargetForm } from './UserWaterTargetForm'

function UserTargetEdit(props) {
    const { user, challenges } = props
    const waterChallenge = challenges['challenge1']
    const userWaterTarget = (user.challengeTargets && user.challengeTargets[waterChallenge.uid])
    if (user) {
        return (
            <Container className='border border-secondary border-rounded m-2'>
                <h5 className='p-2 m-2'>User's Challenge Targets</h5>
                {Object.values(challenges).map(challenge => (
                    <UserWaterTargetForm key={challenge.uid} user={user} challenge={challenge} userTarget={userWaterTarget} />
                ))}
            </Container>
        )
    } else {
        return <Container>No User Found</Container>
    }
}
export default UserTargetEdit
