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
			const snapshot = await firebaseApp.dbUserById(user.uid).once('value')
			const dbUser = snapshot.val()
			const { username, userRole } = dbUser
			const mergedUser = {
				uid: user.uid,
				email: user.email,
				emailVerified: user.emailVerified,
				providerData: user.providerData,
				username,
				userRole,
			}
			localStorage.setItem('authUser', JSON.stringify(mergedUser))
			setAuthState({ initializing: false, user: mergedUser })
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
