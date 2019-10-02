import React from 'react'
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import useInputValue from '../../modules/hooks/useInputValue'
const moment = require('moment')

export default function ContestCreateForm() {
	const { user } = useAuthUserContext()
	const { appData, createContest, enrollUserInContest } = useDataContext()
	const { users, posts, contests, challenges } = appData
	const title = useInputValue('Sample1')

	const createContestOnSubmit = async event => {
		event.preventDefault()
		const enrolledUsers = [...event.target.enrolledUsers].filter(input => input.checked).map(input => input.value)
		let newContest = {
			title: title.value,
			startDate: event.target.startDate.value,
			enrollmentCap: event.target.enrollmentCap.value,
		}
		console.log('new Contest:', newContest)
		const newContestId = await createContest(newContest)
		if (newContestId) {
			enrolledUsers.forEach(userId => {
				console.log(newContestId)
				enrollUserInContest(userId, newContestId)
			})
		}
	}
	const today = moment().format('YYYY-MM-DD')
	return (
		<Container>
			<Form onSubmit={createContestOnSubmit} className="border border-primary rounded p-4 mt-4 mb-3 text-center">
				<h2>Contest Creation Form</h2>
				<FormGroup>
					<Label for="title">Title</Label>
					<Input name="title" type="text" {...title} />
				</FormGroup>
				<FormGroup>
					<Label for="startDate">Start Date</Label>
					<Input name="startDate" type="date" defaultValue={today} />
				</FormGroup>
				<FormGroup>
					<Label for="enrollmentCap">Enrollment Cap</Label>
					<Input name="enrollmentCap" type="number" defaultValue="Enrollment cap" />
				</FormGroup>
				{users && (
					<FormGroup>
						Enrolled Users:
						{Object.keys(users).filter(userKey => users[userKey].userRole === 'default').map(userKey => {
							const user = users[userKey]
							return (
								<FormGroup key={userKey} check inline>
									<Label check>
										{`${user.firstName} ${user.lastName}`}
										<Input type="checkbox" value={userKey} name="enrolledUsers" />
									</Label>
								</FormGroup>
							)
						})}
					</FormGroup>
				)}
				<Button type="submit">Submit</Button>
			</Form>
		</Container>
	)
}
