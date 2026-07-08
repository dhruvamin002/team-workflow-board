import { useCallback } from "react"
import { Card } from "../Card"
import "./style.css"
import { useTasks } from "../../hooks"
function EmptyTask() {
    return <p className="task-column-no-task">No tasks</p>
}

function TaskView({tasks, openEditView}) {
    return tasks.map((task) => {
        return <Card {...task} key={task.id} openEditView={openEditView} />
    })
}

export function BoardColumn({title, id, tasks, openEditView}) {
    const { updateTask } = useTasks()
    const handleOnDrop = useCallback((e) => {
        const data = JSON.parse(e.dataTransfer.getData('data') || {})
        if (data.status === id) return
        updateTask({...data, status: id})
    }, [id, updateTask])
    return (
        <div className="task-column" onDrop={handleOnDrop} onDragOver={(e) => e.preventDefault()}>
            <div className="task-column-header">
                <h2 className="task-column-header-title">{title}</h2>
            </div>
            <div className="task-column-list">
                {tasks.length === 0 ? <EmptyTask /> : <TaskView tasks={tasks} openEditView={openEditView} />}
            </div>
        </div>
    )
}