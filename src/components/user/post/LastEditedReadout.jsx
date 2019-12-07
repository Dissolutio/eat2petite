import React from 'react'
import { format } from 'date-fns'

export default function LastEditedReadout({ lastEditedAt }) {
    return (lastEditedAt && (
        <p className='mt-1'>
            <small className='text-center text-info'>
                {`Last edit: ${format(new Date(lastEditedAt), 'Pp')}`}
            </small>
        </p>
    )) || null
}
