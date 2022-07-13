import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore = (set) => ({
  userProfile: null,
  addUser: (user) => set({ userProfile: user }),
  removeUser: (user) => set({ userProfile: "" }),
  allUsers: [],

  fetchAllUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}api/users`);

    set({ allUsers: data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
