import React from 'react'
import { Container } from 'reactstrap'
import { format } from 'date-fns'
export default function FuturePostDateCard({ challengeForDay, date }) {
    const { challengeName } = challengeForDay
    const formattedDate = format(new Date(date), 'P')

    return (
        <Container className="border border-primary rounded p-4 mt-4 mb-3 text-center">
            <h5 className='text-primary border-bottom border-primary'>{challengeName}</h5>
            <p className='text-secondary'>{formattedDate}</p>
            <p className='text-secondary'>This is a future day!</p>
        </Container>
    )
}
