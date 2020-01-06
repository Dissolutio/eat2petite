import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Firebase } from './modules/firebase'
import { FirebaseContext, useFirebaseContext } from './contexts/useFirebaseContext'
import { AuthUserContext, useAuthListener } from './contexts/useAuthUserContext'
import { UIContextProvider } from './contexts/useUIContext'
import { DataContextProvider } from './contexts/useDataContext'
import { RealtimeDataContextProvider } from './contexts/useRealtimeData'

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
						<RealtimeDataContextProvider>
							<Router>
								<App />
							</Router>
						</RealtimeDataContextProvider>
					</DataContextProvider>
				</UIContextProvider>
			</AuthWrapper>
		</FirebaseWrapper>
	)
}
ReactDOM.render(<AppWrapper />, document.getElementById('root'))

serviceWorker.unregister()
