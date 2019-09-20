import React from 'react'
import { withRouter } from 'react-router-dom'

import { useAuthUserContext } from './contexts/useAuthUserContext'
import SideNav from './components/navigation/SideNav'
import Header from './components/layout/Header'
import AppRouter from './components/layout/AppRouter'
import AppStyle from './components/layout/AppStyle'
import PageStyle from './components/layout/PageStyle'
import DevConsole from './components/shared/DevConsole'

function App(props) {
	const { initializing } = useAuthUserContext()
	if (initializing && props.location.pathname === '/') {
		return <h1>Authenticating...</h1>
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
export default withRouter(App)
