import React from 'react'
import { Container } from 'reactstrap'

import { useDataContext } from '../../contexts/useDataContext'
import DevConsole from '../shared/DevConsole'
import AdminContestsList from './AdminContestsList'
export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { contests } = appData
	return (
		<Container>
			<h2>Admin Dashboard</h2>
			<AdminContestsList contests={contests} />
			{((process.env.NODE_ENV === 'development') && (<DevConsole />))}
		</Container>
	)
}
