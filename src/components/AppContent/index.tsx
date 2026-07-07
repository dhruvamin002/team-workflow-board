import { useState, useCallback } from "react"
import Header from "../Header"
import { Modal } from "../Modal"
import { TaskForm } from "../TaskForm"
import { useTasks } from "../../hooks"
import { BoardView } from "../BoardView"
import "./style.css"

export function AppContent() {
    const { segregatedTasks } = useTasks()
    const [openModal, setOpenModal] = useState(false)

    const makeModalVisible = useCallback(() => {
        setOpenModal(true)
    }, [])

    const closeModal = useCallback(() => {
        setOpenModal(false)
    }, [])
    return (
        <div>
            <Header createNewTask={makeModalVisible} />
            <main className="main">
                <BoardView tasks={segregatedTasks} />
            </main>
            <Modal closeModal={closeModal} isOpen={openModal}>
                <TaskForm cancelTask={closeModal} />
            </Modal>
        </div>
    )
}