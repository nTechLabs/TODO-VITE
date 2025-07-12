import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCounterZStore = create(
  devtools((set, get) => ({
    count: 0,
    increment: (value = 1) => 
      set((state) => ({ count: state.count + value })),
    decrement: (value = 1) => 
      set((state) => ({ count: state.count - value })),
    reset: () => set({ count: 0 }),
    setCount: (value) => set({ count: value }),
    // 추가 기능들
    incrementBy: (value) => 
      set((state) => ({ count: state.count + value })),
    decrementBy: (value) => 
      set((state) => ({ count: state.count - value })),
    doubleCount: () => 
      set((state) => ({ count: state.count * 2 })),
  }))
);

export default useCounterZStore;
