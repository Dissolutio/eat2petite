import React from 'react'
import { Container, ButtonGroup, Button, } from 'reactstrap'
import { random } from 'lodash'
import { format, addDays, eachDayOfInterval, isSameDay } from 'date-fns'
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
		<Container className="border border-secondary p-3 m-2">
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

export function UserDevConsole(props) {
	const { userSelectedContest, currentChallenge } = props
	const {
		appData,
		savePost,
		loadFirebaseData,
		consoleLogAppData,
	} = useDataContext()
	const { me } = appData

	const createABunchOfWaterChallengePosts = (event) => {
		const yesterday = new Date(format(addDays(new Date(), -1), 'P'))
		const dateInterval = eachDayOfInterval({
			start: new Date(userSelectedContest.startDate),
			end: yesterday,
		})
		Promise.all(dateInterval.map(dateToPost => {
			const createdAt = (new Date()).toString()
			const postDate = format(dateToPost, 'P')
			const checkedInBonus = isSameDay(new Date(createdAt), new Date(postDate))
			let newPost = {
				author: me.uid,
				userId: me.uid,
				uid: null,
				contestId: userSelectedContest.uid,
				challengeId: currentChallenge.uid,
				postDate,
				createdAt,
				quantityWaterDrank: random(1, 10),
				quantityWaterDrankUnits: 'cups',
				checkedInBonus,
				lastEditedAt: createdAt,
			}
			return savePost(newPost)
		})).then(() => (
			console.log('SamplePostsMade')
		))
	}
	return (
		<Container className="border border-secondary p-3 m-2">
			<h4 className="text-center">Dev Console</h4>
			<ButtonGroup vertical style={{ width: '100%' }}>
				<Button color="primary" onClick={consoleLogAppData}>
					CONSOLE LOG APP DATA
			</Button>
				<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD FIREBASE DATA " />
				<DoubleClickButton doubleClickCallback={createABunchOfWaterChallengePosts} text="MAKE ALL PREVIOUS POSTS FOR USER IN SELECTED CONTEST "
					firstColor="primary" secondColor="warning"
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