import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(newTask) {
        setTasks(prev => [...prev, newTask]);
    }

    function deleteTask(id) {
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    function updateTask(updatedTask) {
        setTasks(prev =>
            prev.map(task =>
                task.id === updatedTask.id ? updatedTask : task));
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            deleteTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}