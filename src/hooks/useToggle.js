import { useState } from 'react'

export const useToggle = initial => {
	const [open, setOpen] = useState(initial)
	return [open, () => setOpen(status => !status)]
}
