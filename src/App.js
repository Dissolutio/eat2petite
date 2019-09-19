import React from 'react'
import { useAuthUserContext } from './contexts/useAuthUserContext'
import SideNav from './components/navigation/SideNav'
import Header from './components/layout/Header'
import AppRouter from './components/layout/AppRouter'
import AppStyle from './components/layout/AppStyle'
import PageStyle from './components/layout/PageStyle'
import DevConsole from './components/shared/DevConsole'

function App() {
	const { initializing } = useAuthUserContext()
	if (initializing) {
		// TODO make this a cool loader
		return <h1>Initializing Authentication</h1>
	}
	return (
		<AppStyle>
			<SideNav />
			<Header />
			<PageStyle>
				<AppRouter />
			</PageStyle>
			<DevConsole />
		</AppStyle>
	)
}
export default App
