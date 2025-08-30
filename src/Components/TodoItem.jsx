import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggled, deleted, edited } from "../redux/todos/action";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiCalendar } from "react-icons/fi";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const { id, title, completed, date, description } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description || "");
  const [newDate, setNewDate] = useState(date || "");

  const handleStatusChange = () => {
    dispatch(toggled(id));
    toast.success(`Todo marked as ${completed ? "incomplete" : "completed"}!`);
  };

  const handleDelete = () => {
    dispatch(deleted(id));
    toast.success("Todo deleted!");
  };

  const handleEditCancel = () => {
    setNewTitle(title);
    setNewDescription(description || "");
    setNewDate(date || "");
    setIsEditing(false);
  };

  const handleEditSave = () => {
    if (newTitle.trim().length < 4) {
      toast.error("Title must be at least 4 characters!");
      return;
    }
    if (newDescription.trim().length < 5) {
      toast.error("Description must be at least 5 characters!");
      return;
    }
    if (!newDate) {
      toast.error("Date is required!");
      return;
    }

    dispatch(
      edited(id, {
        title: newTitle,
        description: newDescription,
        date: newDate,
      })
    );
    setIsEditing(false);
    toast.success("Todo updated!");
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 mb-3 rounded-lg shadow-md bg-white border-l-4 transition ${
        completed ? "border-l-gray-400" : "border-l-green-600"
      }`}
    >
      <div className="flex items-start w-full md:w-auto">
        {!completed && (
          <input
            type="checkbox"
            checked={completed}
            onChange={handleStatusChange}
            className="cursor-pointer w-5 h-5 accent-green-600 mr-3 mt-1"
          />
        )}

        <div className="flex flex-col max-w-[400px]">
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
              className="border px-2 py-1 rounded w-full outline-none text-sm resize-none mb-2"
              placeholder="Add description"
              rows="2"
            />
          ) : (
            <p
              className={`text-sm ${
                completed ? "line-through text-gray-400" : "text-gray-600"
              } mb-2`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 md:mt-0 md:ml-6 w-[140px] flex items-center gap-1">
        {isEditing ? (
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border px-2 py-1 rounded w-full outline-none text-sm"
          />
        ) : (
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
            <FiCalendar className="text-gray-500" size={16} />
            <span className="text-xs font-medium text-gray-500">{date}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 mt-2 md:mt-0 md:ml-6">
        {!completed && isEditing && (
          <>
            <button
              onClick={handleEditSave}
              className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100"
              title="Save"
            >
              <FaCheck size={18} />
            </button>
            <button
              onClick={handleEditCancel}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              title="Cancel"
            >
              <FaTimes size={18} />
            </button>
          </>
        )}
        {!completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100"
            title="Edit"
          >
            <FaEdit size={20} />
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
          title="Delete"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
}
