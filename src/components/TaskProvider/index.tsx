import { ReactNode, useCallback, useMemo, useReducer } from "react";
import TaskProviderContext from "../../contexts/tastContext";
import { createTask, updateTask } from "../../utils";

const INITIAL_STATE = []

function reducer(state, action) {
    switch(action.type) {
        case 'CREATE_TASK':
            const taskData = action.data
            const taskDataWithId = createTask(taskData)
            return [ ...state,taskDataWithId ]
        case 'UPDATE_TASK':
            console.log(action.data)
            const taskWithUpdatedData = action.data
            const updatedTaskWithTime = updateTask(taskWithUpdatedData)
            const updatedState =  state.map((d) => {
                if (d.id === updatedTaskWithTime.id) return updatedTaskWithTime
                return d
            })
            return updatedState
        default:
            return state
    }
}

export function TaskProvider({children} : {children: ReactNode}) {
    const [ tasks, dispatch ] = useReducer(reducer, INITIAL_STATE)
    const createTask = useCallback((data) => {
        dispatch({type: 'CREATE_TASK', data: data})
    }, [])
    const updateTask = useCallback((data) => {
        dispatch({type: 'UPDATE_TASK', data: data})
    }, [])
    const segregatedTasks = useMemo(() => {
        const data = {backlog: [], progress: [], done:[]}
        console.log(tasks)
        tasks.forEach(task => {
            data[task.status]?.push(task)
        })
        return data
    }, [tasks])
    const value = {
        createTask,
        updateTask,
        tasks,
        segregatedTasks
    }
    return <TaskProviderContext.Provider value={value}>{children}</TaskProviderContext.Provider>
}

