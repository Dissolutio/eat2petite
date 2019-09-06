import React from 'react'
import { useAuthUserContext } from './firebase'
import SideNav from './components/navigation/SideNav'
import Header from './components/layout/Header'
import PageRouter from './components/layout/PageRouter'
import { AppStyleContainer, PageStyleContainer } from './components/layout/AppStyle'
import DevConsole from './components/shared/DevConsole'

function App() {
	const { initializing } = useAuthUserContext()
	if (initializing) {
		// TODO make this a cool loader
		return <h1>Initializing Authentication</h1>
	}

	return (
		<AppStyleContainer>
			<SideNav />
			<Header />
			<DevConsole />
			<PageStyleContainer>
				<PageRouter />
			</PageStyleContainer>
		</AppStyleContainer>
	)
}
export default App
