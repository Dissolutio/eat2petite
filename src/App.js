import React from 'react'

import { useAuthUserContext } from 'contexts/useAuthUserContext'

import Header from './components/layout/Header'
import AppRouter from './components/navigation/AppRouter'
import { PageStyle, AppStyle } from './components/layout/StyleWrappers'
import LandingPage from './components/layout/LandingPage'

// Auth initializes => render AppRouter => IF user => route to dashboard with useRealtimeDataContext hook => init database listeners
function App() {
	const { initializing, user } = useAuthUserContext()
	return (
		<AppStyle>
			<Header user={user} />
			<PageStyle >
				{initializing ? <LandingPage /> : <AppRouter />}
			</PageStyle>
		</AppStyle>
	)
}

export default App
