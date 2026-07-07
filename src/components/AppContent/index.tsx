import { useState, useCallback } from "react"
import Header from "../Header"
import { Modal } from "../Modal"
import { TaskForm } from "../TaskForm"
import { useTasks } from "../../hooks"
import { BoardView } from "../BoardView"
import "./style.css"
import { FilterStrip } from "../FilterStrip"

export function AppContent() {
    const { segregatedTasks } = useTasks()
    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState({})

    const makeModalVisible = useCallback(() => {
        setOpenModal(true)
    }, [])

    const closeModal = useCallback(() => {
        setOpenModal(false)
        setEditData({})
    }, [])

    const openEditView = useCallback((data) => {
        setEditData(data)
        setOpenModal(true)
    }, [])

    return (
        <div>
            <Header createNewTask={makeModalVisible} />
            <main className="main">
                <FilterStrip />
                <BoardView tasks={segregatedTasks} openEditView={openEditView} />
            </main>
            <Modal closeModal={closeModal} isOpen={openModal}>
                <TaskForm 
                    cancelTask={closeModal}
                    editData={editData}
                />
            </Modal>
        </div>
    )
}