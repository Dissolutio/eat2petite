import React from 'react'
import { Container, Collapse, Button } from 'reactstrap'
import ChallengeCard from './ChallengeCard'

export default function ChallengesList(props) {
	const { challenges } = props
	if (challenges) {
		console.log("TCL: ChallengesList -> challenges", challenges)
		return (
			<Container>
				<h2>All Challenges:</h2>
				{Object.values(challenges).map(challenge => {
					return (
						<ChallengeCollapseCard key={challenge.uid} challenge={challenge} />
					)
				})}
			</Container>
		)
	} else {
		return (
			<div>No challenges found</div>
		)
	}
}
const ChallengeCollapseCard = ({ challenge }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	if (!challenge) { return null }

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }} block>{challenge.challengeName} {isOpen ? (<span>&#9650;</span>) : (<span>&#9660;</span>)}</Button>
			<Collapse isOpen={isOpen}>
				<ChallengeCard challenge={challenge} />
			</Collapse>
		</div>
	);
}
