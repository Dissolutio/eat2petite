import React from 'react'
import PropTypes from 'prop-types'
import GalleryList from './GalleryList'

export default function Paginator(props) {
    const limit = 10
    const { cardsInGallery } = props
    const currentPage = props.match.currentPage
    const totalPages = Math.floor(cardsInGallery.length / limit) || 1
    const firstItem = (currentPage || 1) * limit - limit
    const lastItem = currentPage * limit
    const cardsToDisplay = cardsInGallery.slice(firstItem, lastItem)
    this.setState({ totalPages, cardsToDisplay })
    return <GalleryList />
}
Paginator.propTypes = {
    cardsInGallery: PropTypes.array.isRequired,
}
