import React from 'react'
import { Link } from 'react-router-dom'

import { useAuthUserContext, useFirebaseContext } from '../../../firebase'
import { useDataContext } from '../../../modules/hooks/useDataContext'

import GalleryRouter from './GalleryRouter'
import GalleryNavLinks from './GalleryNavLinks'

export default function Gallery() {
	const firebaseApp = useFirebaseContext()
	const { user } = useAuthUserContext()
	const { coreCards } = useDataContext()

	return (
		<div>
			<h1>
				<Link to={{ pathname: '/' }}>Gallery</Link>
			</h1>
			<p># of Cards in Current Library {coreCards.length}</p>
			<GalleryNavLinks />
			<GalleryRouter />
		</div>
	)
}
