import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

export default function DevConsole(props) {
	const { setSampleDataToFirebase } = useDataContext()
	return (
		<div>
			<button onClick={setSampleDataToFirebase}>SET SAMPLE FIREBASE DATA </button>
		</div>
	)
}
