import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggled, colorSelected, deleted, edited } from "../redux/todos/action";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const { id, text, completed, color } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  // Toggle complete/incomplete
  const handleStatusChange = () => {
    dispatch(toggled(id));
    toast.success("Todo status updated!");
  };

  // Change color
  const handleColorChange = (selectedColor) => {
    dispatch(colorSelected(id, selectedColor));
    toast.success(`Color changed to ${selectedColor}`);
  };

  // Delete todo
  const handleDelete = () => {
    dispatch(deleted(id));
    toast.success("Todo deleted!");
  };

  // Save edit
  const handleEditSave = () => {
    if (newText.trim() === "") {
      toast.error("Todo cannot be empty!");
      return;
    }
    if (newText.trim().length < 4) {
      toast.error("Todo must be at least 4 characters!");
      return;
    }
    dispatch(edited(id, newText));
    setIsEditing(false);
    toast.success("Todo updated!");
  };

  return (
    <div className="flex items-center p-2 hover:bg-gray-50 transition rounded-md border border-gray-200">
      {/* Checkbox */}
      {!completed && (
        <div className="flex items-center mr-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleStatusChange}
            className="cursor-pointer w-5 h-5 accent-green-500"
          />
        </div>
      )}

      {/* Text or Edit Field */}
      <div className="flex-1">
        {isEditing && !completed ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border px-2 py-1 rounded w-full outline-none"
          />
        ) : (
          <span
            className={`select-none text-base ${
              completed ? "line-through text-gray-400" : "text-gray-600"
            }`}
          >
            {text}
          </span>
        )}
      </div>

      {/* Colors */}
      <div className="flex space-x-2 ml-3">
        <span
          onClick={() => handleColorChange("green")}
          className={`h-4 w-4 rounded-full border-2 cursor-pointer border-green-500 ${
            color === "green" ? "bg-green-500" : ""
          }`}
        />
        <span
          onClick={() => handleColorChange("yellow")}
          className={`h-4 w-4 rounded-full border-2 cursor-pointer border-yellow-500 ${
            color === "yellow" ? "bg-yellow-500" : ""
          }`}
        />
        <span
          onClick={() => handleColorChange("red")}
          className={`h-4 w-4 rounded-full border-2 cursor-pointer border-red-500 ${
            color === "red" ? "bg-red-500" : ""
          }`}
        />
      </div>

      {/* Edit Button */}
      <div className="flex items-center space-x-3 ml-4">
        {!completed && isEditing && (
          <button
            onClick={handleEditSave}
            className="text-green-500 hover:text-green-700"
            title="Save"
          >
            <FaCheck />
          </button>
        )}
        {!completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <FaEdit />
          </button>
        )}

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
