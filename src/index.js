import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Firebase, FirebaseContext, useFirebaseContext, AuthUserContext, useAuthListener } from './firebase'
import { UIContextProvider } from './modules/hooks/useUIContext'
import { DataContextProvider } from './modules/hooks/useDataContext'

import App from './App'

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css'

import * as serviceWorker from './serviceWorker'

const firebaseApp = new Firebase()

function FirebaseWrapper({ children }) {
	return <FirebaseContext.Provider value={firebaseApp}>{children}</FirebaseContext.Provider>
}
function AuthWrapper({ children }) {
	const firebaseApp = useFirebaseContext()
	const authState = useAuthListener(firebaseApp)
	return <AuthUserContext.Provider value={authState}>{children}</AuthUserContext.Provider>
}

function AppWrapper() {
	return (
		<FirebaseWrapper>
			<AuthWrapper>
				<UIContextProvider>
					<DataContextProvider>
						<Router>
							<App />
						</Router>
					</DataContextProvider>
				</UIContextProvider>
			</AuthWrapper>
		</FirebaseWrapper>
	)
}
ReactDOM.render(<AppWrapper />, document.getElementById('root'))

serviceWorker.unregister()
