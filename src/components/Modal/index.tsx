import { ReactNode, useCallback, useEffect, useRef } from "react";
import "./style.css"


type ModalProp = {
    isOpen: boolean
    children: ReactNode
    closeModal: () => void
}

export function Modal({ isOpen, closeModal, children}: ModalProp) {
    const ref = useRef<HTMLDialogElement | null>(null)
    
    const handleKeyPress = useCallback((e: Event) => {
        closeModal && closeModal()
    }, [closeModal])

    useEffect(() => {
        if (isOpen && ref.current) {
            const dialog = ref.current
            dialog.showModal()
            dialog?.addEventListener('close', handleKeyPress)
            return () => dialog?.removeEventListener('close', handleKeyPress)
        }
    }, [handleKeyPress, isOpen])
    
    if (!isOpen) return null
    return (
        <dialog ref={ref} className="modal">
            <div className="modal-header">
                <h2 className="modal-title">Create Task</h2>
                <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </dialog>
    )
}