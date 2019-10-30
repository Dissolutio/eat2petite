import React from 'react'
import { withRouter } from 'react-router-dom'

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
			<PageStyle className="p-2 m-2">
				<AppRouter authUser={props.user} />
			</PageStyle>
		</AppStyle>
	)
}

const NonAuthApp = () => {
	return (
		<AppStyle>
			<Header />
			<PageStyle className="p-2 m-2">
				<LandingPage />
			</PageStyle>
		</AppStyle>
	)
}

export default withRouter(App)
