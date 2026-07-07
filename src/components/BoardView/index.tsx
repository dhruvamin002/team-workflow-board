import { useTasks } from "../../hooks"
import { formatRelativeTime } from "../../utils"
import { Select } from "../Select"
import "./style.css"

function Tags({tags}) {
    if (!tags) return
    const tagsArray = tags && tags.split(',')
    return (
        <div className="task-card-tags">
            {tagsArray.map((tag, idx) => {
                return <span className="tag tag-primary" key={idx}>{tag}</span>
            })}
        </div>
    )
}

function Card({id, title, description, assignee, tags, status, priority, updatedAt, openEditView}) {
    const { updateTask } = useTasks()
    const onStatusUpdate = (e) => {
        updateTask({id, title, description, assignee, tags, status: e.target.value, priority, updatedAt})
    }
    return(
        <div className="card task-card ">
            <div className="task-card-body">
                <div className="task-card-top" onClick={() => openEditView({id, title, description, assignee, tags, status, priority})}>
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

function EmptyTask() {
    return <p className="task-column-no-task">No tasks</p>
}

function TaskView({tasks, openEditView}) {
    return tasks.map((task) => {
        return <Card {...task} key={task.id} openEditView={openEditView} />
    })
}

function BoardColumn({title, tasks, openEditView}) {
    return (
        <div className="task-column">
            <div className="task-column-header">
                <h2 className="task-column-header-title">{title}</h2>
            </div>
            <div className="task-column-list">
                {tasks.length === 0 ? <EmptyTask /> : <TaskView tasks={tasks} openEditView={openEditView} />}
            </div>
        </div>
    )
}
export function BoardView({ tasks, openEditView }) {
    return (
        <div className="task-board">
            <BoardColumn 
                tasks={tasks.backlog}
                title="Backlog"
                openEditView={openEditView}
            />
            <BoardColumn
                tasks={tasks.progress}
                title="In Progress"
                openEditView={openEditView}
            />
            <BoardColumn
                tasks={tasks.done}
                title="Done"
                openEditView={openEditView}
            />
        </div>
    )
}