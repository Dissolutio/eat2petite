import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

export default function DevConsole(props) {
	const { setSampleDataToFirebase, loadSampleData, loadLocalData, setLocalData, loadFirebaseData } = useDataContext()
	return (
		<div>
			<button onClick={setSampleDataToFirebase}>SET SAMPLE FIREBASE DATA </button>
			<button onClick={loadFirebaseData}>LOAD FIREBASE DATA </button>
			<button onClick={loadSampleData}>LOAD SAMPLE DATA </button>
			<button onClick={setLocalData}>SET LOCAL DATA </button>
			<button onClick={loadLocalData}>LOAD LOCAL DATA </button>
		</div>
	)
}
