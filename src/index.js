import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Firebase } from './firebase'
import {
	FirebaseContext,
	useFirebaseContext,
	AuthContext,
	useAuthListener,
	RealtimeDataContextProvider,
	UIContextProvider
} from './contexts'

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
	return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
}

function AppWrapper() {
	return (
		<FirebaseWrapper>
			<AuthWrapper>
				<UIContextProvider>
					<RealtimeDataContextProvider>
						<Router>
							<App />
						</Router>
					</RealtimeDataContextProvider>
				</UIContextProvider>
			</AuthWrapper>
		</FirebaseWrapper>
	)
}
ReactDOM.render(<AppWrapper />, document.getElementById('root'))

serviceWorker.unregister()
