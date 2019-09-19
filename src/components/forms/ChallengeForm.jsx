import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import { useDataContext } from '../../contexts/useDataContext'
import ChallengeCard from '../shared/ChallengeCard'

export default function ChallengeForm(props) {
	// TODO Use FirebaseApp or useDataContext to save/update challenge
	const { firebaseApp } = useFirebaseContext
	const { appData } = useDataContext()
	const { match } = props
	const challenge = appData.challenges[match.params.id]
	const [formData, setFormData] = React.useState({ ...challenge, activeEdit: false })

	if (formData.activeEdit === false) {
		return (
			(challenge && (
				<>
					<Button onClick={() => setFormData({ ...formData, activeEdit: !formData.activeEdit })}>
						Toggle Edit Mode
					</Button>
					<ChallengeCard challenge={challenge} match={match} />
				</>
			)) ||
			null
		)
	} else {
		const saveChallenge = event => {
			event.preventDefault()
			const newChallenge = {
				challengeName: event.target.challengeName.value,
				description: event.target.description.value,
				formulaForTarget: event.target.formulaForTarget.value,
			}
			// updateFBChallenge(newChallenge)
			setFormData({ ...formData, activeEdit: !formData.activeEdit })
		}
		return (
			challenge && (
				<Form onSubmit={event => saveChallenge(event)}>
					<Button type="submit">Save and Exit Edit Mode</Button>
					<FormGroup>
						<Label for="challengeName">Title</Label>
						<Input type="text" name="challengeName" defaultValue={challenge && challenge.challengeName} />
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input type="textarea" name="description" defaultValue={challenge && challenge.description} />
					</FormGroup>
					<FormGroup>
						<Label for="formulaForTarget">Formula For Target</Label>
						<Input
							type="textarea"
							name="formulaForTarget"
							defaultValue={challenge && challenge.formulaForTarget}
						/>
					</FormGroup>
					<p>Units: {challenge && challenge.units}</p>
					<ul>
						<h6>Extra Units</h6>
						{challenge &&
							challenge.data &&
							challenge.data.extraUnits &&
							challenge.data.extraUnits.map((extraUnit, index) => <li key={index}>{extraUnit}</li>)}
					</ul>
				</Form>
			)
		)
	}
}
