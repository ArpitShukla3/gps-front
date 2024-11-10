// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../components/comp/SideBar";
import Map from "../Map";
import { axiosInstance, backendServer, fecthApi } from "../../apiList";
import useUserStore from "../store";
import { io } from "socket.io-client";
export default function Dashboard() {
  const setUser = useUserStore((state) => state.setUser);
  const setTo = useUserStore((state) => state.setTo);
  const setFrom = useUserStore((state) => state.setFrom);
  const From = useUserStore((state) => state.From);
  const socket = io(backendServer, { withCredentials: true });
  const user = useUserStore((state) => state.user);
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

  return (
    <div>
      <Toaster />
      <div className="w-screen h-screen flex flex-row ">
        <div className="w-1/3">
          <SideBar />
        </div>
        <Map />
      </div>
    </div>
  );
}
