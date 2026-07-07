import { useRef, useState } from "react";
import { Button } from "../Button";
import { Select } from "../Select";
import { TextArea } from "../TextArea";
import { TextInput } from "../TextInput";
import "./style.css"
import { useTasks } from "../../hooks";

type FormErrors = {
    title: string
    description: string
    assignee: string
}

export function TaskForm({cancelTask}: {cancelTask: () => void}) {
    const ref = useRef<HTMLFormElement | null>(null)
    const [ errors, setErrors ] = useState<FormErrors>({title: '', description: '', assignee: ''})
    const { createTask } = useTasks()
    const create = (data) => {
        createTask(data)
    }
    const validate = () => {
        if (ref.current) {
            const err: FormErrors = {title: '', description: '', assignee: ''}
            const formData = new FormData(ref.current)
            const title = formData.get('title')
            const description = formData.get('description')
            const assignee = formData.get('assignee')
            let validationPassed = true
            if (!title) {
                err.title = 'Title is required'
                validationPassed = false
            }
            if (!description) {
                err.description = 'Description is required'
                validationPassed = false
            }
            if (!assignee) {
                err.assignee = 'Assignee is required'
                validationPassed = false
            }
            if (!validationPassed) {
                setErrors(err)
            } else {
                create(formData)
            }
        }
    }
    return (
        <form className="task-form" ref={ref}>
            <TextInput 
                label="Title"
                placeholder="Enter tast title"
                required={true}
                id='task-title'
                name='title'
                error={errors.title}
            />
            <TextArea 
                label="Description"
                placeholder="Describe the task in details"
                required={true}
                id='task-description'
                name='description'
                error={errors.description}
            />
            <Select 
                label="Status"
                required={true}
                values={[['backlog', 'Backlog'], ['progress', 'In Progress'], ['done', 'Done']]}
                id='task-priority'
                name='status'
            />
            <Select 
                label="Priority"
                required={true}
                values={[['medium', 'Medium'], ['low', 'Low'], ['high', 'High']]}
                id='task-priority'
                name='priority'
            />
            <TextInput 
                label="Assignee"
                placeholder="Team member name"
                required={false}
                id='task-assignee'
                name='assignee'
                error={errors.assignee}
            />
            <TextInput 
                label="Tags"
                placeholder="bug, frontend"
                required={false}
                id='task-tags'
                name='tags'
            />
            <div className="task-form-action">
                <div className="task-form-action-right">
                    <Button title="Cancel" type="btn--secondary" size="btn--md" onClick={cancelTask} />
                    <Button title="Create Task" size="btn--md" onClick={validate} />
                </div>
            </div>
        </form>
    )
}