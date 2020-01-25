import React from 'react'
import { useFirebaseContext, useAuthContext } from 'contexts'

export default function AccountPage(props) {
	const firebaseApp = useFirebaseContext()
	const { user } = useAuthContext()
	return (
		<div>
			AccountPage! Where authenticated users view and edit their account info!
			{user && (
				<ul>
					{Object.keys(user).map(key => {
						const userKey = key.toString()
						const userValue = user[key].toString()
						return <li key={userKey}>{`${userKey}: ${userValue}`}</li>
					})}
				</ul>
			)}
			<button onClick={firebaseApp.doSignOut}>Sign Out</button>
		</div>
	)
}
