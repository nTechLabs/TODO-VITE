import { create } from "zustand";
import axios from "axios";
import { USERS_API_URL } from "../../api/api";

const useUserStore = create((set) => ({
  users: [],
  isLoading: false,
  isError: false,
  error: "",
  checked: [],
  deleteError: "",
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
  toggleChecked: (id) =>
    set((state) => ({
      checked: state.checked.includes(id)
        ? state.checked.filter((c) => c !== id)
        : [...state.checked, id],
    })),
  deleteUsers: async () => {
    set({ deleteError: "" });
    try {
      await Promise.all(
        get().checked.map(async (id) => {
          await axios.delete(`${USERS_API_URL}/${id}`);
        })
      );
      set((state) => ({
        users: state.users.filter((u) => !state.checked.includes(u.id)),
        checked: [],
      }));
    } catch (e) {
      set({ deleteError: e?.message || "삭제에 실패했습니다." });
    }
  },
}));

export default useUserStore;
