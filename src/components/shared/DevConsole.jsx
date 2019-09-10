import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

import DoubleClickButton from '../shared/DoubleClickButton'

export default function DevConsole(props) {
	const {
		setSampleDataToFirebase,
		loadSampleData,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
	} = useDataContext()
	return (
		<div>
			<DoubleClickButton doubleClickCallback={setSampleDataToFirebase} text="SET SAMPLE FIREBASE DATA" />
			<DoubleClickButton doubleClickCallback={loadSampleData} text="LOAD FIREBASE DATA " />
			<DoubleClickButton doubleClickCallback={loadLocalData} text="LOAD SAMPLE DATA " />
			<DoubleClickButton doubleClickCallback={setLocalData} text="SET LOCAL DATA " />
			<DoubleClickButton doubleClickCallback={loadFirebaseData} text="LOAD LOCAL DATA " />
			<DoubleClickButton doubleClickCallback={consoleLogAppData} text="CONSOLE LOG APP DATA" />
		</div>
	)
}
