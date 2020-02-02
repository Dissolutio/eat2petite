import React from 'react'
import { isAfter } from 'date-fns'

export default function useKeepDateInContestRange(selectedContest, selectedDate, setSelectedDate) {
    React.useEffect(() => {
        if (!selectedContest) { return }
        const contestStartDate = new Date(selectedContest.startDate)
        const contestEndDate = new Date(selectedContest.endDate)
        if (isAfter(selectedDate, contestEndDate)) {
            setSelectedDate(contestEndDate)
        }
        if (isAfter(contestStartDate, selectedDate)) {
            setSelectedDate(contestStartDate)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedContest])
}
