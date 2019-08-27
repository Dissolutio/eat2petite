import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CloudinaryContext } from 'cloudinary-react'

import { Firebase, FirebaseContext, useFirebaseContext, AuthUserContext, useAuthListener } from './firebase'
import { UIContextProvider } from './modules/hooks/useUIContext'
import { DataContextProvider } from './modules/hooks/useDataContext'

import App from './App'

import 'normalize.css'
import './theme.css'
import * as serviceWorker from './serviceWorker'

const firebaseApp = new Firebase()

ReactDOM.render(
    <CloudinaryContext cloudName="mystery-maintenance">
        <FirebaseContext.Provider value={firebaseApp}>
            <AppWrapper />
        </FirebaseContext.Provider>
    </CloudinaryContext>,
    document.getElementById('root'),
)

function AppWrapper() {
    const firebaseApp = useFirebaseContext()
    const authState = useAuthListener(firebaseApp)
    return (
        <AuthUserContext.Provider value={authState}>
            <UIContextProvider>
                <DataContextProvider>
                    <Router>
                        <App />
                    </Router>
                </DataContextProvider>
            </UIContextProvider>
        </AuthUserContext.Provider>
    )
}

serviceWorker.unregister()
