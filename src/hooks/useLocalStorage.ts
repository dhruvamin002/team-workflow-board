import { useState, useEffect, useCallback } from "react";

export function useLocalStorage(key) {
    const [currentData, setCurrentData] = useState(() => JSON.parse(localStorage.getItem(key) || '[]'))

    useEffect(() => {
        const handleStorageEvent = (e: StorageEvent) => {
            if (e.key === key) {
                setCurrentData(JSON.parse(e.newValue || '[]'))
            }
        }
        window.addEventListener('storage', handleStorageEvent)
        return () => window.removeEventListener('storage', handleStorageEvent)
    }, [key])

    const updateItem = useCallback((data) => {
        localStorage.setItem(key, JSON.stringify(data || []))
    }, [key])

    return [currentData, updateItem]
}