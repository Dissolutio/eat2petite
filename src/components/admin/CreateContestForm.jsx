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
	const [numberOfChallenges, setNumberOfChallenges] = React.useState(6)
	const generateChallengeOrderInputLength = () => {
		var array = [];
		for (var i = 1; i <= numberOfChallenges; i++) {
			array.push(i);
		}
		return array
	}
	const challengeInputNames = generateChallengeOrderInputLength().map((input, index) => `Challenge${index + 1}`)
	const title = useInputValue('Sample1')
	const daysPerChallenge = useInputValue(14)
	const createContestOnSubmit = async event => {
		event.preventDefault()
		const orderOfChallenges = () => {
			return challengeInputNames.reduce((orderOfChallenges, inputName, currIndex) => {
				orderOfChallenges[currIndex + 1] = event.target[inputName].value
				return orderOfChallenges
			}, {})
		}
		const enrolledUsers = [...event.target.enrolledUsers].filter(input => input.checked).map(input => input.value)
		let newContest = {
			title: title.value,
			startDate: event.target.startDate.value,
			daysPerChallenge: daysPerChallenge.value,
			orderOfChallenges: orderOfChallenges(),
			numberOfChallenges,
		}
		console.log('new Contest:', newContest)
		// const newContestId = await createContest(newContest)

		// if (newContestId) {
		// 	enrolledUsers.forEach(userId => {
		// 		console.log(newContestId)
		// 		enrollUserInContest(userId, newContestId)
		// 	})
		// }
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
					<Label for="numberOfChallenges">Number of Challenges</Label>
					<Input name="numberOfChallenges" type="number" value={numberOfChallenges} onChange={(event) => setNumberOfChallenges(event.target.value)} />
				</FormGroup>
				<FormGroup>
					<Label for="daysPerChallenge">Days per Challenge</Label>
					<Input name="daysPerChallenge" type="number" {...daysPerChallenge} />
				</FormGroup>
				{users && (
					<FormGroup>
						Enrolled Users:
						{Object.keys(users).filter(userKey => users[userKey].userRole === 'default').map(userKey => {
							const user = users[userKey]
							return (
								<FormGroup key={userKey} check >
									<Label check>
										<Input type="checkbox" value={userKey} name="enrolledUsers" />
										{`${user.firstName} ${user.lastName}`}
									</Label>
								</FormGroup>
							)
						})}
					</FormGroup>
				)}
				{
					generateChallengeOrderInputLength().map((orderSelect, orderIndex) => {
						const inputName = `Challenge${orderIndex + 1}`
						return (
							<FormGroup key={inputName}>
								<Label for={inputName}>{`Challenge ${orderIndex + 1}`}</Label>
								<Input type="select" name={inputName} id="exampleSelect">
									{
										challenges && Object.keys(challenges).map(challengeKey => {
											const challenge = challenges[challengeKey]
											return (<option key={`${orderIndex}--${challengeKey}`} value={challenge.uid}>{challenge.challengeName}</option>)
										})
									}
								</Input>
							</FormGroup>
						)
					})
				}
				<Button type="submit">Submit</Button>
			</Form>
		</Container>
	)
}
