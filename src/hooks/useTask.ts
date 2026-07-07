import { useContext } from "react";
import TaskProviderContext from "../contexts/tastContext";

export function useTasks() {
    const context = useContext(TaskProviderContext)
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context
}