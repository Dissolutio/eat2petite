import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

export default function UserHomePage() {
	const { appData } = useDataContext()
	console.log(appData)
	return (
		<div>
			<h1>User Home Page!</h1>
		</div>
	)
}
