import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'

import DoubleClickButton from '../shared/DoubleClickButton'
import { Button, ButtonGroup } from 'reactstrap'
export default function DevConsole() {
	const {
		appData,
		setSampleDataToFirebase,
		loadSampleData,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
		enrollUserInContest,
	} = useDataContext()
	// function enrollOnClick() {
	// 	const userToEnroll = appData.users[process.env.REACT_APP_USER1_FIRE_UID]
	// 	const contest = appData.contests[process.env.REACT_APP_CONTEST1_FIRE_UID]
	// 	enrollUserInContest(userToEnroll, contest)
	// }
	return (
		<ButtonGroup vertical style={{ width: '100%' }}>
			<Button color="primary" onClick={consoleLogAppData}>
				CONSOLE LOG APP DATA
			</Button>
			<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD FIREBASE DATA " />
			<DoubleClickButton doubleClickCallback={setSampleDataToFirebase} text="SET SAMPLE FIREBASE DATA" />
			<DoubleClickButton doubleClickCallback={setLocalData} text="SET LOCAL DATA " />
			<DoubleClickButton doubleClickCallback={loadLocalData} text="LOAD LOCAL DATA " />
			{/* <DoubleClickButton doubleClickCallback={loadSampleData} text="LOAD SAMPLE DATA " /> */}
		</ButtonGroup>
	)
}
