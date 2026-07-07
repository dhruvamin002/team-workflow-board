import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import TaskProviderContext from "../../contexts/tastContext";
import { createTask, updateTask } from "../../utils";
import { useFilter, useLocalStorage } from "../../hooks";

const PRIORITY_MAP = {'low': 1, 'medium': 2, 'high': 3}

function reducer(state, action) {
    switch(action.type) {
        case 'CREATE_TASK':
            const taskData = action.data
            const taskDataWithId = createTask(taskData)
            return [ ...state,taskDataWithId ]
        case 'UPDATE_TASK':
            const taskWithUpdatedData = action.data
            const updatedTaskWithTime = updateTask(taskWithUpdatedData)
            const updatedState =  state.map((d) => {
                if (d.id === updatedTaskWithTime.id) return updatedTaskWithTime
                return d
            })
            return updatedState
        case 'SET_TASKS':
            return action.data
        default:
            return state
    }
}

export function TaskProvider({children} : {children: ReactNode}) {
    const [ storageTasks, updateStorage ] = useLocalStorage('tasks')
    const [ tasks, dispatch ] = useReducer(reducer, storageTasks)
    const [filterState, filterByStatus, filterBySearchPriority, changeSort, changeSortDirection] = useFilter()
    const createTask = useCallback((data) => {
        dispatch({type: 'CREATE_TASK', data: data})
    }, [])
    const updateTask = useCallback((data) => {
        dispatch({type: 'UPDATE_TASK', data: data})
    }, [])
    useEffect(() => {
        updateStorage(tasks)
    }, [tasks, updateStorage])

    useEffect(() => {
        dispatch({ type: 'SET_TASKS', data: storageTasks })
    }, [storageTasks])
    
    const segregatedTasks = useMemo(() => {
        const filteredTask = tasks.filter(task => {
            if (filterState.filter) {
                if (filterState.filter.search) {
                    if (task.title.includes(filterState.filter.search) || task.description.includes(filterState.filter.search)) {
                        return true
                    }
                } else if (filterState.filter.status && filterState.filter.status.length > 0) {
                    if (filterState.filter.status.includes(task.status)) {
                        return true
                    }
                } else if (filterState.filter.priority) {
                    if (filterState.filter.priority === 'all') {
                        return true
                    } else if (filterState.filter.priority === task.priority) {
                        return true
                    }
                } else {
                    return true
                }
            } else {
                return true
            }
            return false
        })
        if (filterState.sortBy === 'created') {
            filteredTask.sort((a, b) => filterState.sortDirection === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt)
        } else if (filterState.sortBy === 'updated') {
            filteredTask.sort((a, b) => filterState.sortDirection === 'asc' ? a.updatedAt - b.updatedAt : b.updatedAt - a.updatedAt)
        } else {
            filteredTask.sort((a, b) => filterState.sortDirection ? PRIORITY_MAP[a.priority] - PRIORITY_MAP[b.priority] : PRIORITY_MAP[b.priority] - PRIORITY_MAP[a.priority])
        }
        const data = {backlog: [], progress: [], done: []}
        filteredTask.forEach(task => {
            data[task.status]?.push(task)
        })
        return data
    }, [tasks, filterState])
    const value = {
        createTask,
        updateTask,
        filterState,
        tasks,
        segregatedTasks,
        filterByStatus,
        filterBySearchPriority,
        changeSort,
        changeSortDirection
    }
    return <TaskProviderContext.Provider value={value}>{children}</TaskProviderContext.Provider>
}

