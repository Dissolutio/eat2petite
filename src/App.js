import React from 'react'

import { useAuthContext } from './contexts'

import {
	Header,
	AppRouter,
	PageStyle,
	AppStyle,
	LandingPage
} from './components'

function App() {
	const { initializing, user } = useAuthContext()
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
