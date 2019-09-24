import React, { Component } from 'react'
import Calendar from 'react-calendar'

import { useDataContext } from '../../contexts/useDataContext'

import WaterChallengePostForm from '../forms/WaterChallengePostForm'
import UserContestsList from './UserContestsList'
import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'
import DevConsole from '../shared/DevConsole'

// 1. Categorize all the days
// 2. Find matching post for each day
/// 3. Display latest six days
// 4. Display quick post form for today

const challenge = () => ({
	challengeName: 'Manage Sugar and Salt Intake',
	description:
		'The average diet has a huge amount of added sugar and salt, and we can benefit from monitoring and managing how much we take into our bodies.',
	formulaForTarget: 'Some amount of weight per human',
	uid: '-LpZo0UXFp8B7C8X5EMW',
	units: 'weight',
})
const getDateArray = (start, end) => {
	const arr = new Array()
	const dt = new Date(start)
	while (dt <= end) {
		arr.push(new Date(dt))
		dt.setDate(dt.getDate() + 1)
	}
	return arr
}
const DashboardCalendar = props => {
	const [selectedDate, setSelectedDate] = React.useState(new Date(2019, 8, 1))
	const changeHandler = date => setSelectedDate({ date })

	return (
		<div>
			<Calendar
				onChange={changeHandler}
				value={selectedDate}
				minDate={new Date(2019, 8, 1)}
				maxDate={new Date(2019, 8, 30)}
			/>
		</div>
	)
}

export default function UserDashboard() {
	const { appData } = useDataContext()
	const { contests, challenges, posts } = appData
	return (
		<div>
			<h1 className="text-center">User Dashboard</h1>
			<hr />
			<DashboardCalendar />
			<DevConsole></DevConsole>
			<UserContestsList contests={contests} />
			<UserPostsList posts={posts} />
			<UserChallengesList challenges={challenges} />
			<WaterChallengePostForm />
		</div>
	)
}
