import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter } from "../redux/filters/action";
import logo from "../assets/image_logo.jpg";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

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
    <div className="my-4 flex flex-col md:flex-row justify-between items-center bg-white shadow-xl px-4 py-6 rounded-lg gap-4 md:gap-0">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-12 w-12 rounded-full" />
      </div>

      {/* Search + Dropdown */}
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-4">
        <div className="relative flex-1 md:flex-none w-full md:w-[600px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by task..."
            value={searchText}
            onChange={handleSearch}
            className="bg-[#F8FAFC] w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {searchText && (
            <FiX
              onClick={() => setSearchText("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            />
          )}
        </div>

        <select
          value={filters.status}
          onChange={handleStatusChange}
          className="px-3 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100 w-full md:w-auto"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
