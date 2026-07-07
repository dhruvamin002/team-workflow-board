import { useState, useCallback } from "react"
import Header from "../Header"
import { Modal } from "../Modal"
import { TaskForm } from "../TaskForm"

export function AppContent() {
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
            <Modal closeModal={closeModal} isOpen={openModal}>
                <TaskForm cancelTask={closeModal} />
            </Modal>
        </div>
    )
}