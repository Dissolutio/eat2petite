import React from 'react'
import Calendar from 'react-calendar'
import { Container } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'

import WaterChallengePostForm from './WaterChallengePostForm'
import UserContestsList from './UserContestsList'

const getDateArray = (start, end) => {
	let arr = []
	const dt = new Date(start)
	while (dt <= end) {
		arr.push({
			date: new Date(dt),
		})
		dt.setDate(dt.getDate() + 1)
	}
	return arr
}
const DashboardCalendar = props => {
	const { startDate, endDate } = props
	console.log('startDate', startDate, 'endDate', endDate())
	const [selectedDate, setSelectedDate] = React.useState(new Date(2019, 8, 10))
	const changeHandler = date => {
		setSelectedDate(date)
	}
	return (
		<div>
			<Calendar
				onChange={changeHandler}
				value={selectedDate}
				calendarType="US"
				minDate={new Date(props.startDate)}
				maxDate={new Date(props.endDate())}
			/>
		</div>
	)
}

export default function UserDashboard() {
	const { appData } = useDataContext()
	const { contests, challenges } = appData
	const makeOrderOfChallenges = () =>
		challenges &&
		Object.keys(challenges).reduce((acc, challengeUid, index) => {
			return { ...acc, [challengeUid]: (index + 1).toString() }
		}, {})
	const orderOfChallenges = makeOrderOfChallenges()
	const selectedContest = {
		title: 'The First Contest: 6 1-Day Challenges',
		numberOfChallenges: '6',
		daysPerChallenge: '2',
		enrollmentCap: '3',
		enrolledUsers: {},
		startDate: new Date('2019/09/01'),
		orderOfChallenges,
	}
	const { startDate, daysPerChallenge } = selectedContest
	const numberOfChallenges = orderOfChallenges && Object.keys(orderOfChallenges).length
	const endDate = () =>
		new Date(startDate).setDate(
			startDate.getDate() + (parseInt(numberOfChallenges) || 1) * (parseInt(daysPerChallenge) || 1) - 1,
		)
	const dateArray = getDateArray(new Date(startDate), endDate()).map((date, index) => {
		const challengeId = Object.keys(orderOfChallenges).find(challengeId => {
			return (
				index + 1 <= parseInt(orderOfChallenges[challengeId]) * daysPerChallenge &&
				index + 1 > (parseInt(orderOfChallenges[challengeId]) - 1) * daysPerChallenge
			)
		})
		return { date, challengeId: challengeId }
	})
	console.log(dateArray)
	return (
		<Container className="text-center">
			<h1 className="text-center">User Dashboard</h1>
			<hr />
			<UserContestsList contests={contests} />
			<DashboardCalendar challenges={challenges} startDate={startDate} endDate={() => endDate()} />
			<WaterChallengePostForm />
		</Container>
	)
}
