import { useContext, useEffect, useState } from "react"
import Column from "./Column"
import TaskForm from "./TaskForm";
import CardModal from "./CardModal";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskContext } from "../contexts/TaskContext";
import TaskCard from "./TaskCard";

function Board() {
    const columns = [{
        columnTitle: "To Do",
        columnStatus: "todo"
    },
    {
        columnTitle: "In Progress",
        columnStatus: "inprogress"
    },
    {
        columnTitle: "Done",
        columnStatus: "done"
    }]

    const { tasks, updateTask } = useContext(TaskContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    function openModal(task) {
        setSelectedTask(task)
        setIsModalOpen(true);
    }

    function handleDragStart(event) {
        const activeId = Number(event.active.id);
        const task = tasks.find(t => t.id === activeId);
        setActiveTask(task);
    }

    function handleDragEnd(event) {
        if (!event.over) {
            setActiveTask(null);
            return;
        }

        const activeId = Number(event.active.id);

        const eventTask = tasks.find(task => task.id === activeId);
        if (!eventTask) return;

        if (eventTask.status !== event.over.id) {
            const updatedTask = {
                ...eventTask,
                status: event.over.id
            }

            updateTask(updatedTask);
        }

        setActiveTask(null);
    }

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Kanban Board
                </h1>

                <div className="flex flex-col gap-6">

                    <TaskForm />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {
                            columns.map((item) => {
                                return <Column
                                    key={item.columnStatus}
                                    columnTitle={item.columnTitle}
                                    columnStatus={item.columnStatus}
                                    openModal={openModal}
                                    activeTask={activeTask}
                                />
                            })
                        }

                    </div>

                </div>

                {
                    isModalOpen &&
                    <CardModal
                        task={selectedTask}
                        closeModal={() => setIsModalOpen(false)}
                    />
                }

            </div>

            <DragOverlay>

                {
                    activeTask ? (
                        <TaskCard
                            task={activeTask}
                            openModal={() => { }}
                        />
                    ) : null
                }

            </DragOverlay>

        </DndContext>
    )
}

export default Board