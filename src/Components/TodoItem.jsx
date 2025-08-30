import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggled, deleted, edited } from "../redux/todos/action";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const { id, title, completed, date, description } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description || "");

  // Toggle complete/incomplete
  const handleStatusChange = () => {
    dispatch(toggled(id));
    toast.success(`Todo marked as ${completed ? "incomplete" : "completed"}!`);
  };

  // Delete todo
  const handleDelete = () => {
    dispatch(deleted(id));
    toast.success("Todo deleted!");
  };

  // Cancel edit
  const handleEditCancel = () => {
    setNewTitle(title);
    setNewDescription(description || "");
    setIsEditing(false);
  };

  // Save edit
  const handleEditSave = () => {
    if (newTitle.trim() === "") {
      toast.error("Title cannot be empty!");
      return;
    }
    if (newTitle.trim().length < 4) {
      toast.error("Title must be at least 4 characters!");
      return;
    }

    dispatch(
      edited(id, {
        title: newTitle,
        description: newDescription,
        date: date,
      })
    );

    setIsEditing(false);
    toast.success("Todo updated!");
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 mb-3 rounded-lg shadow-md border-l-4 transition ${
        completed
          ? "border-l-gray-400 bg-gray-100"
          : "border-l-blue-500 bg-white"
      }`}
    >
      {/* Left section (checkbox + content) */}
      <div className="flex items-start w-full md:w-auto">
        {!completed && (
          <input
            type="checkbox"
            checked={completed}
            onChange={handleStatusChange}
            className="cursor-pointer w-5 h-5 accent-blue-500 mr-3 mt-1"
          />
        )}

        <div className="flex flex-col">
          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border px-2 py-1 rounded w-full outline-none text-lg font-semibold mb-2"
              placeholder="Todo title"
            />
          ) : (
            <h3
              className={`text-lg font-semibold ${
                completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          )}

          {/* Description */}
          {isEditing ? (
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border px-2 py-1 rounded w-full outline-none text-sm resize-none"
              placeholder="Add description (optional)"
              rows="2"
            />
          ) : (
            description && (
              <p
                className={`text-sm ${
                  completed ? "line-through text-gray-400" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            )
          )}
        </div>
      </div>

      {/* Middle - Date */}
      {date && (
        <div className="mt-2 md:mt-0 md:ml-6">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {date}
          </span>
        </div>
      )}

      {/* Right - Actions */}
      <div className="flex items-center space-x-2 mt-2 md:mt-0 md:ml-6">
        {!completed && isEditing && (
          <>
            <button
              onClick={handleEditSave}
              className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100"
              title="Save"
            >
              <FaCheck size={16} />
            </button>
            <button
              onClick={handleEditCancel}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              title="Cancel"
            >
              <FaTimes size={16} />
            </button>
          </>
        )}
        {!completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
            title="Edit"
          >
            <FaEdit size={16} />
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
          title="Delete"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
}
