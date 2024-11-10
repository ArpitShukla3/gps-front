// src/store.js
import { create } from "zustand";

// Create a store
const useUserStore = create((set) => ({
  // Define your state here
  user: null,
  setUser: (userData) => set({ user: userData }),
  To: null,
  setTo: (data) => set({ To: data }),
  From: null,
  setFrom: (data) => set({ From: data }),
  active: null,
  setActive: (data) => set({ active: data }),
  toggler:false,
  setToggler: (data) => set({ toggler: data }),
}));

// Subscribe to changes and log the state
useUserStore.subscribe((state) => {
  // console.log("State changed:", state);  
});

export default useUserStore;