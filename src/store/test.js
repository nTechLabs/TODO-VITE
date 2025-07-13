import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools((set, get) => ({
    list: [],
    isLoading: false, // API 호출 등 비동기 작업의 로딩 상태
    isError: false,   // 에러 발생 여부 (API 실패 등)
    errorMsg: '',
    fetchList: async () => {
      set({ isLoading: true, isError: false, errorMsg: '' });
      try {
        // const response = await fetch(API_URL);
        // const data = await response.json();
        // set({ list: data, isLoading: false });
      } catch (e) {
        set({ isError: true, errorMsg: e.message, isLoading: false });
      }
    },
    getItemById: (id) => get().list.find((item) => String(item.id) === String(id)),
    addItem: (item) => set((state) => ({ list: [...state.list, item] })),
    deleteItem: (id) => set((state) => ({ list: state.list.filter((v) => v.id !== id) })),
    updateItem: (id, newItem) => set((state) => ({ list: state.list.map((v) => v.id === id ? newItem : v) })),
    clear: () => set({ list: [] }),
  }), { name: 'Item' })
);