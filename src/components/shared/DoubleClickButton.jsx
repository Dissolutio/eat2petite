import React from 'react'
import { useDoubleClick } from '../../modules/hooks/useDoubleClick'
import { Button } from 'reactstrap'
export default function DoubleClickButton(props) {
	const { text, doubleClickCallback } = props
	const [clickCount, incrementClick, setClickCountToZero] = useDoubleClick(doubleClickCallback)
	if (clickCount === '1') {
		const clearTimer1 = setTimeout(() => {
			setClickCountToZero()
		}, 3000)
		if (clickCount === '0') {
			return (
				<Button
					style={{ color: 'var(--font-dark)', backgroundColor: 'var(--E2P-orange, orange)' }}
					onClick={incrementClick}>
					{text}
				</Button>
			)
		}
		const doubleClickEvent = () => {
			clearTimeout(clearTimer1)
			setTimeout(() => {
				incrementClick()
			}, 1000)
		}
		return (
			<Button style={{ color: 'red', backgroundColor: 'var(--E2P-light-gray, gray)' }} onClick={doubleClickEvent}>
				REALLY {text} ?
			</Button>
		)
	}
	return (
		<Button
			style={{ color: 'var(--font-dark)', backgroundColor: 'var(--E2P-orange, orange)' }}
			onClick={incrementClick}>
			{text}
		</Button>
	)
}
