import React, { useState } from 'react'
import { UncontrolledAlert } from 'reactstrap'
const useFormAlert = () => {
    const [currentAlert, setCurrentAlert] = useState({})

    const fireAlert = (newAlert) => {
        const { text, color } = newAlert
        setCurrentAlert({ text, color })
        setTimeout(() => {
            setCurrentAlert({})
        }, 3000);
    }

    const CurrentAlertDisplay = () => {
        const { text, color } = currentAlert
        return (currentAlert && currentAlert.text) ? (<UncontrolledAlert color={color}>{text}</UncontrolledAlert>) : null
    }
    return { currentAlert, fireAlert, CurrentAlertDisplay }
}
export default useFormAlert

// import useFormAlert from '... /modules/hooks/useFormAlert'
// const { currentAlert, fireAlert, CurrentAlertDisplay } = useFormAlert()
// fireAlert({ text: 'Something worth noting!', color: primary, secondary, success, danger, warning, info, light, dark })