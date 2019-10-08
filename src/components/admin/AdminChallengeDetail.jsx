import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import { useDataContext } from '../../contexts/useDataContext'
import ChallengeCard from '../shared/ChallengeCard'

export default function AdminChallengeDetail(props) {
	const { firebaseApp } = useFirebaseContext
	const { appData, updateChallenge, loadFirebaseData } = useDataContext()
	const { match } = props
	const challenge = appData.challenges[match.params.id]
	const [formData, setFormData] = React.useState({ ...challenge, activeEdit: false })
	const saveChallenge = event => {
		event.preventDefault()
		const newChallenge = {
			...challenge,
			challengeName: event.target.challengeName.value,
			description: event.target.description.value,
			formulaForTarget: event.target.formulaForTarget.value,
		}
		updateChallenge(newChallenge).then(() => loadFirebaseData()).catch(error => console.log(error))
		setFormData({ ...formData, activeEdit: !formData.activeEdit })
	}
	const discardChanges = event => {
		setFormData({ ...challenge, activeEdit: false })
	}
	if (formData.activeEdit === false) {
		return (
			(challenge && (
				<>
					<Button color='info' block onClick={() => setFormData({ ...formData, activeEdit: !formData.activeEdit })}>
						Edit Challenge info
					</Button>
					<ChallengeCard challenge={challenge} match={match} />
				</>
			)) ||
			null
		)
	} else {
		return (
			challenge && (
				<Form onSubmit={event => saveChallenge(event)}>
					<Button type="submit" size='lg' color='success' block>Save Changes</Button>
					<Button type="button" size='sm' className='mt-4 mb-4' color='danger' block onClick={discardChanges}>Discard Changes</Button>
					<FormGroup>
						<Label for="challengeName">Title</Label>
						<Input type="text" name="challengeName" defaultValue={challenge.challengeName} />
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input type="textarea" name="description" defaultValue={challenge.description} />
					</FormGroup>
					<FormGroup>
						<Label for="formulaForTarget">Formula For Target</Label>
						<Input
							type="textarea"
							name="formulaForTarget"
							defaultValue={challenge.formulaForTarget}
						/>
					</FormGroup>
					<p>Units: {challenge.units}</p>
					<ul>
						<h6>Extra Units</h6>
						{challenge.data && challenge.data.extraUnits &&
							challenge.data.extraUnits.map((extraUnit, index) => <li key={index}>{extraUnit}</li>)}
					</ul>
				</Form>
			)
		)
	}
}
