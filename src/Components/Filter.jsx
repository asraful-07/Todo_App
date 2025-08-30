import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter } from "../redux/filters/action";
import logo from "../assets/image_logo.jpg";
import { useState } from "react";

export default function Filter({ onSearch }) {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const handleStatusChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="my-4 flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
      {/* Left side: Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
        <h1 className="font-bold text-gray-700 text-lg">My Todos</h1>
      </div>

      {/* Center: Search */}
      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={handleSearch}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right side: Dropdown */}
      <div>
        <select
          value={filters.status}
          onChange={handleStatusChange}
          className="px-3 py-2 border rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
