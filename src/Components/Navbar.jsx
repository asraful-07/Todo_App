import { useDispatch } from "react-redux";
import { useState } from "react";
import { added } from "../redux/todos/action";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();

  // Modal input state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() === "" || title.length < 4) {
      toast.error("Title must be at least 4 characters!");
      return;
    }

    dispatch(added({ title, date, description }));
    toast.success("Task added successfully!");

    // Clear input fields
    setTitle("");
    setDate("");
    setDescription("");

    // Close modal
    document.getElementById("task_modal").close();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold">Task</h1>

      <button
        className="btn btn-success"
        onClick={() => document.getElementById("task_modal").showModal()}
      >
        <FaPlusCircle /> Add Task
      </button>

      <dialog id="task_modal" className="modal">
        <div className="modal-box w-96 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Task Details</h3>

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

          <div className="modal-action flex justify-between">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button className="btn btn-success" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Navbar;
