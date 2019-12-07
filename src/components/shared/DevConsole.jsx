import React from 'react'
import { Container, ButtonGroup, Button, } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import { useDataContext } from '../../contexts/useDataContext'

import DoubleClickButton from '../shared/DoubleClickButton'

import { sampleUsers } from '../../sampleData'

export function AdminDevConsole() {
	const {
		dbResetToSample,
		dbLoadSavePoint,
		loadFirebaseData,
		consoleLogAppData,
	} = useDataContext()
	return (
		<Container>
			<ButtonGroup vertical style={{ width: '100%' }}>
				<Button color="primary" onClick={consoleLogAppData}>
					CONSOLE LOG APP DATA
			</Button>
				<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD FIREBASE DATA " />
				<DoubleClickButton doubleClickCallback={dbLoadSavePoint} text="LOAD DB SAVE POINT"
					firstColor="primary" secondColor="warning"
				/>
				<DoubleClickButton doubleClickCallback={dbResetToSample} text="DB RESET TO SAMPLE"
					firstColor="danger" secondColor="danger"
				/>
			</ButtonGroup>
		</Container>
	)
}

export const SignInDevConsole = (props) => {
	const firebaseApp = useFirebaseContext()
	const { setFormError } = props
	const signInAsSampleUser = email => {
		firebaseApp.doSignInWithEmailAndPassword(email, 'password').catch(error => {
			console.log(error)
			setFormError(error)
		})
	}
	return (
		<Container className="p-1 mt-5 mb-3">
			{sampleUsers ? Object.values(sampleUsers).map(sampleUser => {
				const { username, email, uid } = sampleUser
				return (
					<Button
						key={uid}
						onClick={() => signInAsSampleUser(email)}
						block
						size="sm"
						color="warning">
						Sign in as {`${username}`}
					</Button>
				)
			}) : null}
		</Container>
	)
}