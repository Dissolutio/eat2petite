import React from 'react'
import { Link } from 'react-router-dom'

export default function GalleryCard(props) {
    const { card } = props
    return (
        <h6>
            <Link to={`/unit/id/${card.uid}`}>{card.name}</Link>
        </h6>
    )
}
