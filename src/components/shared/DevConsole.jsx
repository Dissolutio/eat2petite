import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'

import DoubleClickButton from '../shared/DoubleClickButton'
import { Button, ButtonGroup } from 'reactstrap'
export default function DevConsole() {
	const {
		appData,
		dbClear,
		dbLoadSavePoint,
		loadSampleData,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
		enrollUserInContest,
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
			<DoubleClickButton doubleClickCallback={loadSampleData} text="LOAD SAMPLE DATA "
				firstColor="primary" secondColor="warning"
			/>
			<DoubleClickButton doubleClickCallback={dbLoadSavePoint} text="LOAD DB SAVE POINT"
				firstColor="primary" secondColor="warning"
			/>
			<DoubleClickButton doubleClickCallback={dbClear} text="CLEAR DATABASE"
				firstColor="danger" secondColor="danger"
			/>
		</ButtonGroup>
	)
}
