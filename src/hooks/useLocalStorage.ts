import { useState, useCallback } from "react";

export function useLocalStorage(key) {
    const [state] = useState(key)
    const currentData = JSON.parse(localStorage.getItem(state) || '[]')
    const updateItem = useCallback((data) => {
        localStorage.setItem(state, JSON.stringify(data || []))
    }, [state])
    return [currentData, updateItem]
}