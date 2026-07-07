import { memo } from "react"
import "./style.css"
import { Button } from "../Button"

function Header({createNewTask}: {createNewTask : () => void}) {
    return (
        <header className='header'>
            <div className='heading'>
                <h1>Team WorkFlow Board</h1>
                <h3>Manage your team's task across the pipeline</h3>
            </div>
            <div className='create-task'>
                <Button title="+ New Task" onClick={createNewTask}/>
            </div>
        </header>
    )
}

export default memo(Header)