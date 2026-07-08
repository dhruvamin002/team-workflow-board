import { useCallback } from "react"
import { useTasks } from "../../hooks"
import { formatRelativeTime } from "../../utils"
import { Select } from "../Select"
import { Tags } from "../Tags"
import "./style.css"

export function Card({id, title, description, assignee, tags, status, priority, createdAt, updatedAt, openEditView}) {
    const { updateTask } = useTasks()

    const onStatusUpdate = useCallback((e) => {
        updateTask({id, title, description, assignee, tags, status: e.target.value, priority, createdAt, updatedAt})
    }, [assignee, description, id, priority, tags, title, updateTask, createdAt, updatedAt])

    const handleDragStart = useCallback((e) => {
        e.dataTransfer.setData('data', JSON.stringify({id, title, description, assignee, tags, status, priority, createdAt, updatedAt}))
    }, [assignee, description, id, priority, status, tags, title, createdAt, updatedAt])

    return(
        <div className="card task-card" draggable onDragStart={handleDragStart}>
            <div className="task-card-body">
                <div className="task-card-top" onClick={() => openEditView({id, title, description, assignee, tags, status, priority})}>
                    <div className="task-card-draggable">
                        <span className="task-card-drag-grip"></span>
                    </div>
                    <div className="task-card-inner">
                        <div className="task-card-row1">
                            <h3 className="task-card-title">{title}</h3>
                            <span className={`tag tag-${priority}`}>{priority}</span>
                        </div>
                        <div className="task-card-row2">
                            <span className="task-card-assignee">{assignee}</span>
                        </div>
                        <Tags tags={tags} />
                    </div>
                </div>
                <div className="task-card-bottom">
                    <span className='task-card-updated-time'>{formatRelativeTime(updatedAt)}</span>
                    <Select
                        values={[['backlog', 'Backlog'], ['progress', 'In Progress'], ['done', 'Done']]}
                        selected={status}
                        onChange={onStatusUpdate}
                    />
                </div>
            </div>
        </div>
    )
}