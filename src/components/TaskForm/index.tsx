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

export function TaskForm({editData = {}, cancelTask}: {editData: {}, cancelTask: () => void}) {
    const ref = useRef<HTMLFormElement | null>(null)
    const [ errors, setErrors ] = useState<FormErrors>({title: '', description: '', assignee: ''})
    const { createTask, updateTask } = useTasks()
    const create = (data) => {
        createTask(data)
        cancelTask()
    }
    const update = (data) => {
        updateTask(data)
        cancelTask()
    }
    const isEditMode = Object.keys(editData).length > 0
    const validate = (e) => {
        e.preventDefault()
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
                const data = {}
                for (const [key, value] of formData.entries()) {
                    data[key] = value
                }
                if (!isEditMode) {
                    create(data)
                } else {
                    update({...editData, ...data})
                }
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
                defaultValue={editData.title ? editData.title : ''}
            />
            <TextArea 
                label="Description"
                placeholder="Describe the task in details"
                required={true}
                id='task-description'
                name='description'
                error={errors.description}
                defaultValue={editData.description ? editData.description : ''}
            />
            <Select 
                label="Status"
                required={true}
                values={[['backlog', 'Backlog'], ['progress', 'In Progress'], ['done', 'Done']]}
                id='task-priority'
                name='status'
                defaultValue={editData.status ? editData.status : ''}
            />
            <Select 
                label="Priority"
                required={true}
                values={[['medium', 'Medium'], ['low', 'Low'], ['high', 'High']]}
                id='task-priority'
                name='priority'
                defaultValue={editData.priority ? editData.priority : ''}
            />
            <TextInput 
                label="Assignee"
                placeholder="Team member name"
                required={true}
                id='task-assignee'
                name='assignee'
                error={errors.assignee}
                defaultValue={editData.assignee ? editData.assignee : ''}
            />
            <TextInput 
                label="Tags"
                placeholder="bug, frontend"
                required={false}
                id='task-tags'
                name='tags'
                defaultValue={editData.tags ? editData.tags : ''}
            />
            <div className={`task-form-action ${isEditMode ? 'task-form__actions--split' : ''}`}>
                {isEditMode ? (
                    <div className="task-form-action-left">
                        <Button title="Delete" type="btn--danger" size="btn--md" onClick={() => {}} />
                    </div>
                ) : null}
                <div className="task-form-action-right">
                    <Button title="Cancel" type="btn--secondary" size="btn--md" onClick={cancelTask} />
                    <Button title="Create Task" size="btn--md" onClick={(e) => validate(e)} />
                </div>
            </div>
        </form>
    )
}