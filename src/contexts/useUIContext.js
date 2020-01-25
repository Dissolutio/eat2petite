import React, { useContext, useState } from 'react'

export const UIContext = React.createContext([{}, () => { }])

const UIContextProvider = props => {
	const [UIState, setUIState] = useState({
		menuOpen: false,
		selectedDateInDashboard: new Date(),
	})
	return <UIContext.Provider value={[UIState, setUIState]}>{props.children}</UIContext.Provider>
}
const useUIContext = () => {
	const [UIState, setUIState] = useContext(UIContext)
	const { menuOpen, selectedDateInDashboard } = UIState
	function toggleMenuOpen() {
		setUIState(UIState => ({ ...UIState, menuOpen: !menuOpen }))
	}
	function setMenuClose() {
		setUIState(UIState => ({ ...UIState, menuOpen: false }))
	}
	function setSelectedDateInDashboard(date) {
		setUIState(UIState => ({ ...UIState, selectedDateInDashboard: date }))
	}
	return {
		menuOpen,
		toggleMenuOpen,
		setMenuClose,
		selectedDateInDashboard,
		setSelectedDateInDashboard
	}
}

export { UIContextProvider, useUIContext }
