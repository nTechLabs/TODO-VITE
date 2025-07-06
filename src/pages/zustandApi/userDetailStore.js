import { create } from "zustand";
import axios from "axios";
import { USERS_API_URL } from "../../api/api";

const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  isError: false,
  error: "",
  saveStatus: null,
  loading: false,
  errorMsg: "",
  emailError: "",
  phoneError: "",
  fetchUsers: async () => {
    set({ isLoading: true, isError: false, error: "" });
    try {
      const res = await fetch(USERS_API_URL);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      set({ users: data, isLoading: false });
    } catch (err) {
      set({ isError: true, error: err.message, isLoading: false });
    }
  },
  getUserById: (id) => get().users.find((u) => String(u.id) === String(id)),
  addUser: async (user) => {
    set({ loading: true, errorMsg: "" });
    try {
      const res = await axios.post(USERS_API_URL, user);
      set((state) => ({
        users: [res.data, ...state.users],
        saveStatus: "success",
        loading: false,
      }));
    } catch (e) {
      set({ errorMsg: e?.message || "저장 실패", saveStatus: "error", loading: false });
    }
  },
  updateUser: async (user) => {
    set({ loading: true, errorMsg: "" });
    try {
      await axios.put(`${USERS_API_URL}/${user.id}`, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === user.id ? { ...u, ...user } : u)),
        saveStatus: "success",
        loading: false,
      }));
    } catch (e) {
      set({ errorMsg: e?.message || "수정 실패", saveStatus: "error", loading: false });
    }
  },
}));

export default useUserStore;
