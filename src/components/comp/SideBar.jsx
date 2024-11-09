import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState } from "react";
import { axiosInstance, logoutApi, searchApi } from "../../../apiList";
import Avatar from "./Avatar";
import useUserStore from "../../store";
import LiveAvatar from "./LiveAvatar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [search, SetSearch] = useState("");
  const [searchResults, SetSearchResults] = useState([]);
  const From = useUserStore((state) => state.From);
  const setTo = useUserStore((state) => state.setTo);
  const setFrom = useUserStore((state) => state.setFrom);
  const setActive = useUserStore((state) => state.setActive);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const logout = async () => {
    try {
      toast.loading("Logging out...");
      await axiosInstance.get(logoutApi, {});
      setUser(null);
      setTo(null);
      setFrom(null);
      setActive(null);
      localStorage.removeItem("authToken");
      toast.dismiss();
      navigate("/auth");
    }
    catch (err) {
      toast.dismiss();
      console.error("Error logging out:", err.message);
      toast.error("Failed to logout");
    }
  }
  const handleSearch = async (e) => {
    SetSearch(e.target.value);
    if (e.target.value === "") {
      SetSearchResults([]);
    }
    debouncedSearch(e.target.value);
  };

  const searchApiCall = async (query) => {
    const res = await axiosInstance.get(searchApi, {
      params: { search: query },
      withCredentials: true,
    });
    console.log("searchApiCall",res.data);
    SetSearchResults(res.data);
  };

  const debouncedSearch = debounce(searchApiCall, 300);
  return (
    <div className="w-full h-full flex flex-col justify-between bg-white h-screen py-10">
      <div className="flex flex-col p-4 pt-4">
      
        <div className="flex flex-row items-center gap-2 mb-4 border border-gray-400 rounded-md px-2">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 rounded border-none focus:outline-none" // Added focus:outline-none to remove the black border when active
          />
        </div>
        {search
          ? searchResults.map((result) => (
              <Avatar
                key={result._id}
                name={result.name}
                email={result.email}
                result={result}
              />
            ))
          : From &&
            From.map((result) => (
              <LiveAvatar
                key={result._id}
                name={result.name}
                email={result.email}
                result={result}
              />
            ))}
      </div>
      <div>
        <button
          className=" w-[96%] px-4 py-4 rounded-full bg-orange-800 font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#f43b3b] transition-colors duration-200"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
