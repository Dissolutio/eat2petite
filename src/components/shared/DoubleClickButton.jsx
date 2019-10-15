import React from 'react'
import { useDoubleClick } from '../../modules/hooks/useDoubleClick'
import { Button } from 'reactstrap'
export default function DoubleClickButton(props) {
	const { text, doubleClickCallback, firstColor, secondColor } = props
	const [clickCount, incrementClick, setClickCountToZero] = useDoubleClick(doubleClickCallback)
	if (clickCount === '0') {
		return (
			<Button
				color={firstColor}
				onClick={incrementClick}>
				{text}
			</Button>
		)
	}
	if (clickCount === '1') {
		const clearTimer1 = setTimeout(() => {
			setClickCountToZero()
		}, 3000)
		const doubleClickEvent = () => {
			clearTimeout(clearTimer1)
			setTimeout(() => {
				incrementClick()
			}, 1000)
		}
		return (
			<Button color={secondColor} onClick={doubleClickEvent}>
				REALLY {text} ?
			</Button>
		)
	}
}
