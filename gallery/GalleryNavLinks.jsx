import React from 'react'
import { Link } from 'react-router-dom'
import { useDataContext } from '../src/modules/hooks/useDataContext'
import * as ROUTES from '../src/routes'

export default function GalleryNavLinks() {
	const { coreCards } = useDataContext()

	const selectRandomUid = myArray => {
		const randomIndex = Math.floor(Math.random() * myArray.length)
		const randomCard = myArray[randomIndex]
		if (randomCard !== undefined && randomCard.hasOwnProperty('uid')) {
			return myArray[randomIndex].uid
		} else {
			return ''
		}
	}
	const randomId = selectRandomUid(coreCards) || ''
	return (
		<ul>
			<li>
				<Link to={{ pathname: `${ROUTES.USER_HOME}/stats` }}>Stats Overview</Link>
			</li>
			<li>
				<Link
					to={{
						pathname: `${ROUTES.USER_HOME}/unit/id/${randomId}`,
					}}>
					Specific Unit by Id
				</Link>
			</li>
		</ul>
	)
}
