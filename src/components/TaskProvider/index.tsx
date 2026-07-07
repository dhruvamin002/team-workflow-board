import { ReactNode, useReducer } from "react";
import TaskProviderContext from "../../contexts/tastContext";
import { createTask, updateTask } from "../../utils";

const INITIAL_STATE = {backlog: [], progress: [], done: []}

function reducer(state, action) {
    switch(action.type) {
        case 'CREATE_TASK':
            const taskData = action.data
            const taskDataWithId = createTask(taskData)
            const status = taskDataWithId.status
            const newState = {...state}
            newState[status].push(taskDataWithId)
            return newState
        case 'UPDATE_TASK':
            const taskWithUpdatedData = action.data
            const taskStatus = taskWithUpdatedData.status
            const updatedTaskWithTime = updateTask(taskWithUpdatedData)
            const updatedState = {...state}
            updatedState[status] =  state[taskStatus].map((d) => {
                if (d.id === taskData.id) return updatedTaskWithTime
                return d
            })
            return updatedState
    }
}

export function TaskProvider({children} : {children: ReactNode}) {
    const [ tasks, dispatch ] = useReducer(reducer, INITIAL_STATE)
    const createTask = (data) => {
        dispatch({type: 'CREATE_TASK', data: data})
    }
    const updateTask = (data) => {
        dispatch({type: 'UPDATE_TASK', data: data})
    }
    const moveTask = (data) => {}
    const value = {
        createTask,
        updateTask,
        moveTask,
        tasks
    }
    return <TaskProviderContext.Provider value={value}>{children}</TaskProviderContext.Provider>
}

