import { useDraggable } from "@dnd-kit/core";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

function TaskCard({ task, openModal, activeTask }) {

    const { deleteTask } = useContext(TaskContext);

    const isDragging = Number(activeTask?.id) === Number(task.id);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id: task.id
    });

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            onClick={() => openModal(task)}
            className={`flex items-start gap-3 bg-white p-3 rounded-xl border-l-4 
                cursor-pointer hover:shadow-md transition
                ${isDragging ? "opacity-0" : task.status === "done" ? "opacity-60" : ""}
                ${task.status === "done"
                    ? "border-gray-300"
                    : task.priority === "high"
                        ? "border-red-500"
                        : task.priority === "medium"
                            ? "border-yellow-400"
                            : task.priority === "low"
                                ? "border-green-500"
                                : "border-gray-300"
                }`}
        >

            <span
                {...listeners}
                className="cursor-grab font-semibold text-gray-400 hover:text-gray-700"
            >
                ☰
            </span>

            <div className="flex flex-col flex-1">
                <p className="text-sm font-medium text-gray-800">
                    {task.title}
                </p>

                {
                    task.description && (
                        <p className="text-xs text-gray-500 line-clamp-2">
                            {task.description}
                        </p>
                    )
                }

            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                }}
                className="text-sm text-red-500 hover:text-red-700"
            >
                Delete
            </button>

        </div>
    )
}

export default TaskCard