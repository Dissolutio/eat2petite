import React, { useContext, useState, useEffect } from 'react'

const AuthUserContext = React.createContext({
	initializing: true,
	user: null,
})
const useAuthUserContext = () => {
	const authState = useContext(AuthUserContext)
	return authState
}
const useAuthListener = firebaseApp => {
	const [authState, setAuthState] = useState(() => {
		const user = firebaseApp.auth.currentUser
		return { initializing: !user, user }
	})
	async function onChange(user) {
		if (user) {
			const dbUser = await firebaseApp
				.dbPrivateUserById(user.uid)
				.once('value')
				.then(snapshot => snapshot.val())
			if (dbUser) {
				const { username, userRole, contests, challengeTargets } = dbUser
				const mergedUser = {
					uid: user.uid,
					email: user.email,
					emailVerified: user.emailVerified,
					providerData: user.providerData,
					username,
					userRole,
					contests,
					challengeTargets,
				}
				setAuthState({ initializing: false, user: mergedUser })
				localStorage.setItem('authUser', JSON.stringify(mergedUser))
				return
			}
			setAuthState({
				initializing: false, user: {
					uid: user.uid,
					email: user.email,
					emailVerified: user.emailVerified,
					providerData: user.providerData,
					username: user.email,
					userRole: 'default',
				}
			})
			localStorage.setItem('authUser', JSON.stringify(user))
		} else {
			localStorage.removeItem('authUser')
			setAuthState({ initializing: false, user: null })
		}
	}
	useEffect(() => {
		const unsubscribe = firebaseApp.auth.onAuthStateChanged(onChange)
		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return authState
}
export { AuthUserContext, useAuthUserContext, useAuthListener }
