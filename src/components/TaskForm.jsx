import { useContext, useState } from "react"
import { TaskContext } from "../contexts/TaskContext";

function TaskForm() {

    const { addTask } = useContext(TaskContext);

    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");
    const [priority, setPriority] = useState("");

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 col-span-3">

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Add New Task
            </h2>

            <form
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!input.trim() || !status) return;

                    addTask({
                        id: Date.now(),
                        title: input.trim(),
                        description: description.trim(),
                        status: status,
                        priority: priority,
                        createdAt : Date.now(),
                    });

                    setInput("");
                    setDescription("");
                    setPriority("");
                    setStatus("todo");
                }}>


                <label className="text-xs text-gray-500">
                    Title
                </label>

                <input
                    type="text"
                    placeholder="Enter Task"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <label className="text-xs text-gray-500">
                    Description
                </label>

                <textarea
                    placeholder="Task Description"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex flex-col gap-1 flex-1">

                    <>
                        <label className="text-xs text-gray-500">
                            Status
                        </label>

                        <select
                            className="border border-gray-300 rounded-lg
                                    p-2 text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="todo">To Do</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </>

                    <>
                        <label className="text-xs text-gray-500">
                            Priority
                        </label>

                        <select
                            className="border border-gray-300 rounded-lg
                                    p-2 text-sm"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </>

                </div>

                <button
                    className={`py-2 rounded-lg text-sm text-white
                        ${!input || !status
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }
                        `}
                >
                    Submit
                </button>

            </form>

        </div>
    )
}

export default TaskForm