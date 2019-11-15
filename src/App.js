import React from 'react'

import { useAuthUserContext } from './contexts/useAuthUserContext'
import Header from './components/layout/Header'
import AppRouter from './components/layout/AppRouter'
import { PageStyle, AppStyle } from './components/layout/StyleWrappers'
import LandingPage from './components/layout/LandingPage'

function App() {
	const { initializing, user } = useAuthUserContext()
	if (initializing === true) {
		return <NonAuthApp />
	}
	if (initializing === false) {
		return <AuthApp user={user} />
	}
}

const AuthApp = (props) => {
	return (
		<AppStyle>
			<Header user={props.user} />
			<PageStyle >
				<AppRouter authUser={props.user} />
			</PageStyle>
		</AppStyle>
	)
}

const NonAuthApp = () => {
	return (
		<AppStyle>
			<Header />
			<PageStyle>
				<LandingPage />
			</PageStyle>
		</AppStyle>
	)
}

export default App
