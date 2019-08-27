import React from 'react'
import { useDataContext } from '../../../modules/hooks/useDataContext'
import { Image } from 'cloudinary-react'

export default function GalleryFullCard(props) {
	const { coreCards } = useDataContext()
	const { location, match } = props
	const uid = match.params.uid
	const card = coreCards.find(card => card.uid === uid)
	const {
		name,
		image,
		general,
		race,
		type,
		cardClass,
		personality,
		height,
		life,
		move,
		range,
		attack,
		defense,
		points,
		figures,
		hexes,
		setWave,
	} = card || ''
	if (!card) {
		return null
	}
	return (
		<div>
			<h1>FullCard</h1>
			<h2>UID: {uid}</h2>
			<p>query: {location.search.toString()}</p>
			<ul>
				<li>
					<b>name:</b>
					{name}
				</li>
				<li>
					<b>image:</b>
					{image}
				</li>
				<li>
					<b>general:</b>
					{general}
				</li>
				<li>
					<b>race:</b>
					{race}
				</li>
				<li>
					<b>type:</b>
					{type}
				</li>
				<li>
					<b>cardClass:</b>
					{cardClass}
				</li>
				<li>
					<b>personality:{personality}></b>
				</li>
				<li>
					<b>height:</b>
					{height}
				</li>
				<li>
					<b>life:</b>
					{life}
				</li>
				<li>
					<b>move:</b>
					{move}
				</li>
				<li>
					<b>range:</b>
					{range}
				</li>
				<li>
					<b>attack:</b>
					{attack}
				</li>
				<li>
					<b>defense:</b>
					{defense}
				</li>
				<li>
					<b>points:</b>
					{points}
				</li>
				<li>
					<b>figures:</b>
					{figures}
				</li>
				<li>
					<b>hexes:</b>
					{hexes}
				</li>
				<li>
					<b>setWave:</b>
					{setWave}
				</li>
			</ul>
		</div>
	)
}
