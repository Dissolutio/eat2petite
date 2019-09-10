import React from 'react'
import { useDoubleClick } from '../../modules/hooks/useDoubleClick'

export default function DoubleClickButton(props) {
	const { text, doubleClickCallback } = props
	const [clickCount, incrementClick, setClickCountToZero] = useDoubleClick(doubleClickCallback)
	if (clickCount === '1') {
		const clearTimer1 = setTimeout(() => {
			setClickCountToZero()
		}, 3000)
		if (clickCount === '0') {
			return (
				<button style={{ color: 'blue' }} onClick={incrementClick}>
					{text}
				</button>
			)
		}
		const doubleClickEvent = () => {
			clearTimeout(clearTimer1)
			setTimeout(() => {
				incrementClick()
			}, 1000)
		}
		return (
			<button style={{ color: 'red', backgroundColor: 'white' }} onClick={doubleClickEvent}>
				REALLY {text} ?
			</button>
		)
	}
	return (
		<button style={{ color: 'blue' }} onClick={incrementClick}>
			{text}
		</button>
	)
}
