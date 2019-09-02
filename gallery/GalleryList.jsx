import React from 'react'

import { useDataContext } from '../../../modules/hooks/useDataContext'

import GalleryCard from './GalleryCard'

const GalleryList = () => {
    const { coreCards } = useDataContext()
    if (!coreCards || !coreCards.length || coreCards === undefined || null) {
        return null
    }
    const clickHandler = () => console.log('Click!')
    return (
        <>
            <div className="pagination-top-block">
                <button className="gallery-button pagination-button" onClick={clickHandler}>
                    Prev
                </button>
                <span className="pagination-readout">Page #currentPage of #totalPages</span>
                <button className="gallery-button pagination-button" onClick={clickHandler}>
                    Next
                </button>
            </div>
            <ul className="gallery-list-grid" />
            {coreCards.map(card => (
                <GalleryCard key={card.uid} card={card} />
            ))}
        </>
    )
}

export default GalleryList
