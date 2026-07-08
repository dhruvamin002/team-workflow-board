import { BoardColumn } from "../BoardColumn"
import "./style.css"

export function BoardView({ tasks, openEditView }) {
    return (
        <div className="task-board">
            <BoardColumn 
                tasks={tasks.backlog}
                title="Backlog"
                id="backlog"
                openEditView={openEditView}
            />
            <BoardColumn
                tasks={tasks.progress}
                title="In Progress"
                id="progress"
                openEditView={openEditView}
            />
            <BoardColumn
                tasks={tasks.done}
                title="Done"
                id="done"
                openEditView={openEditView}
            />
        </div>
    )
}