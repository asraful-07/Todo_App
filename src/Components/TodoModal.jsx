import { useDispatch } from "react-redux";
import { useState } from "react";
import { added } from "../redux/todos/action";
import { FaPlusCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const TodoModal = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() === "" || title.length < 4) {
      toast.error("Title must be at least 4 characters!");
      return;
    }

    if (date.trim() === "") {
      toast.error("Please select a date!");
      return;
    }

    if (description.trim() === "" || description.length < 5) {
      toast.error("Description must be at least 5 characters!");
      return;
    }

    dispatch(added({ title, date, description }));
    toast.success("Task added successfully!");

    setTitle("");
    setDate("");
    setDescription("");

    document.getElementById("task_modal").close();
  };

  return (
    <div className="flex justify-between items-center my-4">
      <h1 className="text-2xl font-bold text-black">Tasks</h1>

      <button
        className="btn bg-green-700 text-white rounded-lg flex items-center gap-2"
        onClick={() => document.getElementById("task_modal").showModal()}
      >
        <FaPlusCircle /> Add Task
      </button>

      <dialog id="task_modal" className="modal">
        <div className="modal-box w-96 max-w-5xl relative">
          <button
            onClick={() => document.getElementById("task_modal").close()}
            className="absolute right-4 top-8  border-2 rounded-full text-gray-500 hover:text-red-500 "
          >
            <FiX size={18} />
          </button>

          <h3 className="font-bold text-lg mb-4">Task Details</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Add a task title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Add any description"
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-action justify-end gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("task_modal").close()}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-green-700 text-white rounded-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TodoModal;
