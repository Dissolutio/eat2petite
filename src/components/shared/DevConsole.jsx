import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

import DoubleClickButton from '../shared/DoubleClickButton'
import { Button } from 'reactstrap'
export default function DevConsole(props) {
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
	function enrollOnClick() {
		const userToEnroll = appData.users['xv870nS3Y0X2dQxCOIly1yv9RDv1']
		const contest = appData.contests['-Lokofx3E7_ITlRokybx']
		enrollUserInContest(userToEnroll, contest)
	}
	return (
		<div>
			<DoubleClickButton doubleClickCallback={setSampleDataToFirebase} text="SET SAMPLE FIREBASE DATA" />
			<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD FIREBASE DATA " />
			<DoubleClickButton doubleClickCallback={loadSampleData} text="LOAD SAMPLE DATA " />
			<DoubleClickButton doubleClickCallback={setLocalData} text="SET LOCAL DATA " />
			<DoubleClickButton doubleClickCallback={loadLocalData} text="LOAD LOCAL DATA " />
			<DoubleClickButton doubleClickCallback={consoleLogAppData} text="CONSOLE LOG APP DATA" />
			<Button color="primary" size="lg" onClick={enrollOnClick}>
				Enroll user_1 in contest_1
			</Button>
		</div>
	)
}
