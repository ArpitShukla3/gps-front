// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../components/comp/SideBar";
import Map from "../Map";
import { axiosInstance, backendServer, fecthApi } from "../../apiList";
import useUserStore from "../store";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const setUser = useUserStore((state) => state.setUser);
  const setTo = useUserStore((state) => state.setTo);
  const setFrom = useUserStore((state) => state.setFrom);
  const From = useUserStore((state) => state.From);
  const socket = io(backendServer, { withCredentials: true });
  const user = useUserStore((state) => state.user);
  const toggler = useUserStore((state) => state.toggler);
  const setToggler = useUserStore((state) => state.setToggler);
  // const [toggler,setToggler] = useState(false);
  const navigateTo = useNavigate();
  async function downloadData() {
    try {
      const data = await axiosInstance.get(fecthApi);
      setUser(data.data); // Set user data in Zustand store
      setTo(data.data.To); // Set To data in Zustand store
      setFrom(data.data.From); // Set From data in Zustand store
      // console.log(data.data.From)
    } catch (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Failed to fetch data");
    }
  }

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to continue");
      navigateTo("/auth");
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      await downloadData();
      setDataLoaded(true);
    }
    fetchData();
  }, []);
  function updateFrom(data){
    console.log("Location update:", data);
    const newFrom = From.filter((doc) => doc._id !== data._id);
    data.updatedAt = new Date().toISOString();
    setFrom([data,...newFrom]);
  }
  useEffect(() => {
    if (dataLoaded && user) {
      socket.on("connect", () => {
        socket.on("location update", (data) => {
            updateFrom(data);
        });
        socket.emit("join room", user._id);
        navigator.geolocation.watchPosition(
          (position) => {
            socket.emit("location update", {
              _id: user._id,
              name: user.name,
              email: user.email,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              To: user.To,
            });
            console.log("Current Position:", position);
          },
          (error) => {
            console.error("Error watching position:", error);
          },
          {
            maximumAge: 1000*1  , // 1 minute
            timeout: 5000, // 5 seconds
            enableHighAccuracy: true,
          }
        );
      });
    }
  }, [dataLoaded]);
  function isSmallDevice() {
    return window.innerWidth <= 768; // You can adjust the width threshold as needed
  }
  return (
    <div>
      <div className="w-screen h-screen flex flex-row relative">
        {toggler && isSmallDevice() && (
          <div className="md:w-1/3 w-full z-10">
            <SideBar />
          </div>
        )}
        {!isSmallDevice() && (
          <div className="md:w-1/3 w-full z-10">
            <SideBar />
          </div>
        )}
        {!toggler && (
          <span className="z-20 absolute top-0 left-0 bg-white m-4 md:hidden" onClick={() => setToggler(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </span>
        )}
        <div className="w-full h-full z-0 ">
          <Map />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
