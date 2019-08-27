import React, { useContext, useState } from 'react'
import { useFirebaseContext } from '../../firebase'
import { getLocalState, setLocalCoreCards } from '../localStorage'

const DataContext = React.createContext([{}, () => {}])

const DataContextProvider = props => {
    const [appData, setAppData] = useState(() => {
        return {
            cardsInGallery: [],
            coreCards: [],
        }
    })
    return <DataContext.Provider value={[appData, setAppData]}>{props.children}</DataContext.Provider>
}

const useDataContext = () => {
    const firebaseApp = useFirebaseContext()
    const [appData, setAppData] = useContext(DataContext)
    const { coreCards } = appData
    React.useEffect(() => {
        loadCoreCards()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadCoreCards = async () => {
        const localData = await getLocalState()
        if (localData && localData.coreCards.length > 0) {
            setAppData({ ...appData, coreCards: localData.coreCards })
            return localData.coreCards
        } else {
            const coreCards = await firebaseApp.getCoreCards()
            await setAppData({ ...appData, coreCards: coreCards || [] })
            setLocalCoreCards(coreCards)
        }
    }
    return {
        coreCards,
        loadCoreCards,
    }
}

export { DataContextProvider, useDataContext }
