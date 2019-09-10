import { useState } from 'react'

export const useDoubleClick = callback => {
	const [clickCount, setClickCount] = useState('0')
	return [clickCount, incrementClick, setClickCountToZero]

	function fireAction() {
		if (typeof callback === 'function') {
			callback()
		}
	}
	function setClickCountToZero() {
		setClickCount('0')
	}
	function incrementClick() {
		if (clickCount === '0') {
			setClickCount('1')
		}
		if (clickCount === '1') {
			fireAction()
			setClickCount('0')
		}
	}
}
