import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

function CardModal({ task, closeModal }) {

  const { updateTask } = useContext(TaskContext);

  const [editedTask, setEditedTask] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                flex items-center justify-center"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl
                flex flex-col gap-5 p-6 shadow-lg"
      >

        {isEditingTitle ? (
          <input
            className="text-lg border border-gray-300 p-2 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                title: e.target.value
              })
            }
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
          />
        ) : (
          <h2
            onClick={() => setIsEditingTitle(true)}
            className="text-xl font-semibold text-gray-800 cursor-pointer"
          >
            {editedTask.title}
          </h2>
        )}

        {
          isEditingDescription ? (
            <textarea
              className="border border-gray-300 p-2 rounded-lg text-sm
                        focus:outline-none focus:ring focus:ring-blue-500"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  description: e.target.value
                })
              }
              onBlur={() => setIsEditingDescription(false)}
              autoFocus
            />
          ) : (
            <p
              onClick={() => setIsEditingDescription(true)}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {editedTask.description}
            </p>
          )
        }

        <div className="flex gap-4">

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500">Status</label>

            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full
                ${editedTask.status === "todo" ? "bg-red-500" :
                  editedTask.status === "inprogress" ? "bg-yellow-400" :
                    "bg-green-500"
                }
                `}
              ></span>

              <select
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    status: e.target.value
                  })
                }
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500">Priority</label>

            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full
                ${editedTask.priority === "high" ? "bg-red-500" :
                  editedTask.priority === "medium" ? "bg-yellow-400" :
                    editedTask.priority === "low" ? "bg-green-500" :
                      "bg-gray-300"
                }
                `}
              ></span>

              <select
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white"
                value={editedTask.priority || ""}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    priority: e.target.value
                  })
                }
              >
                <option value="">No Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              updateTask(editedTask);
              closeModal();
            }}
            className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white 
                      hover:bg-blue-700"
          >
            Save
          </button>

        </div>

        <div className="flex justify-end gap-3 pt-2">
          <p className="text-xs text-gray-400 italic text-center">
            Click on text to edit
          </p>
        </div>

      </div>

    </div>
  );
}

export default CardModal;