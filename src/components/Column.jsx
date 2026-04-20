import CardModal from "./CardModal";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

function Column({ columnTitle, columnStatus, openModal, activeTask }) {

    const { tasks, deleteTask } = useContext(TaskContext);
    console.log("tasks", tasks)

    const { setNodeRef } = useDroppable({
        id: columnStatus
    });

    const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1
    };

    const filteredTasks = tasks
        .filter(task => task.status === columnStatus)
        .sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));

    return (
        <div
            ref={setNodeRef}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col max-h-[80vh]"
        >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex justify-between">
                {columnTitle}
                <span className="text-sm text-gray-500">
                    {filteredTasks.length}
                </span>
            </h2>

            <div className="flex flex-col gap-3 overflow-y-auto">

                {filteredTasks.length === 0 && (
                    <p className="text-sm text-gray-400 text-center mt-4">
                        No tasks yet. Add one.
                    </p>
                )}

                {filteredTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        openModal={openModal}
                        activeTask={activeTask}
                    />
                ))}

            </div>
        </div>
    )
}

export default Column