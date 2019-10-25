import React from 'react'
import { Container, ButtonGroup, Button, } from 'reactstrap'
import { random } from 'lodash'
import { format, addDays, eachDayOfInterval } from 'date-fns'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import { useDataContext } from '../../contexts/useDataContext'

import DoubleClickButton from '../shared/DoubleClickButton'

import { sampleUsers } from '../../sampleData'

export function AdminDevConsole() {
	const {
		dbResetToSample,
		dbLoadSavePoint,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
	} = useDataContext()
	return (
		<ButtonGroup vertical style={{ width: '100%' }}>
			<Button color="primary" onClick={consoleLogAppData}>
				CONSOLE LOG APP DATA
			</Button>
			<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD FIREBASE DATA " />
			<DoubleClickButton doubleClickCallback={setLocalData} text="SET LOCAL DATA "
				firstColor="primary" secondColor="warning"
			/>
			<DoubleClickButton doubleClickCallback={loadLocalData} text="LOAD LOCAL DATA "
				firstColor="primary" secondColor="warning"
			/>
			<DoubleClickButton doubleClickCallback={dbLoadSavePoint} text="LOAD DB SAVE POINT"
				firstColor="primary" secondColor="warning"
			/>
			<DoubleClickButton doubleClickCallback={dbResetToSample} text="DB RESET TO SAMPLE"
				firstColor="danger" secondColor="danger"
			/>
		</ButtonGroup>
	)
}

export function UserDevConsole(props) {
	const { userSelectedContest } = props
	const {
		appData,
		loadLocalData,
		createUserPost,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
	} = useDataContext()
	const { me } = appData
	const handlePostsButtonClick = (event) => {
		const dateInterval = eachDayOfInterval({
			start: new Date(userSelectedContest.startDate),
			end: new Date(format(addDays(new Date(), -1), 'P'))
		})
		Promise.all(dateInterval.map(dateToPost => {
			let newPost = {
				author: me.uid,
				userId: me.uid,
				createdAt: (new Date()).toString(),
				postDate: format(dateToPost, 'P'),
				contestId: userSelectedContest.uid,
				quantityDrank: random(1, 10),
				quantityDrankUnits: 'cups',
			}
			console.log("TCL: handlePostsButtonClick -> newPost", newPost)
			return createUserPost(newPost)
		})).then(() => (
			loadFirebaseData()
		))
	}
	return (
		<ButtonGroup vertical style={{ width: '100%' }}>
			<Button color="primary" onClick={consoleLogAppData}>
				CONSOLE LOG APP DATA
			</Button>
			<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD FIREBASE DATA " />
			<DoubleClickButton doubleClickCallback={handlePostsButtonClick} text="MAKE ALL PREVIOUS POSTS FOR USER IN SELECTED CONTEST "
				firstColor="primary" secondColor="warning"
			/>
		</ButtonGroup>
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