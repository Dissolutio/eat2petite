const localStorageStateKey = 'heroscape-armory-app-state'

export const getLocalState = () => {
    try {
        const serializedState = localStorage.getItem(localStorageStateKey)
        if (serializedState === null) {
            return undefined
        }
        const localState = JSON.parse(serializedState)
        return localState
    } catch (error) {
        return undefined
    }
}
export const setLocalCoreCards = async coreCards => {
    try {
        const localState = await getLocalState()
        let newState
        if (localState) {
            newState = { ...localState, coreCards: coreCards }
        } else {
            newState = { coreCards: coreCards }
        }
        const serializedState = JSON.stringify(newState)
        localStorage.setItem(localStorageStateKey, serializedState)
    } catch (error) {
        console.log(error)
    }
}
