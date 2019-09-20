import React from 'react'
import { withRouter } from 'react-router-dom'

import { useAuthUserContext } from './contexts/useAuthUserContext'
import Header from './components/layout/Header'
import AppRouter from './components/layout/AppRouter'
import AppStyle from './components/layout/AppStyle'
import PageStyle from './components/layout/PageStyle'

function App(props) {
	const { initializing } = useAuthUserContext()
	if (initializing && props.location.pathname === '/') {
		return <h1>Authenticating...</h1>
	}
	return (
		<AppStyle>
			<Header />
			<PageStyle>
				<AppRouter />
			</PageStyle>
		</AppStyle>
	)
}
export default withRouter(App)
