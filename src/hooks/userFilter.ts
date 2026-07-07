import { useState } from "react";

export function useFilter() {
    const [state, setState] = useState({})
    const filterBySearchPriority = (filterParameter, value) => {
        setState(prev => {
            const newState = {...prev}
            newState['filter'] = newState['filter'] ? {...newState['filter']} : {}
            if (filterParameter === 'search') {
                newState['filter']['search'] = value
            }
            if (filterParameter === 'priority') {
                newState['filter']['priority'] = value
            }
            return newState
        })
    }
    const filterByStatus = (val, checked) => {
        setState(prev => {
            const newState = {
                ...prev,
                filter: { ...(prev.filter ? prev.filter : {}) }
            }
            newState.filter.status = newState.filter.status ? [...newState.filter.status] : []
            if (checked) {
                newState.filter.status.push(val)
            } else {
                newState.filter.status = newState.filter.status.filter(v => v !== val)
            }
            return newState
        })
    }
    const changeSort = (val) => {
        setState(prev => {
            return {
                ...prev,
                sortBy: val
            }
        })
    }
    const changeSortDirection = () => {
        setState(prev => {
            return {
                ...prev,
                sortDirection: prev.sortDirection === 'asc' ? 'dsc' : 'asc'
            }
        })
    }
    return [state, filterByStatus, filterBySearchPriority, changeSort, changeSortDirection]
}