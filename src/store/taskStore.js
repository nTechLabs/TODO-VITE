import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TASKS_API_URL } from "../interface/api";
import { is } from "date-fns/locale";
export const useTaskStore = create(
  devtools(
    (set, get) => ({
      taskList: [],
      checked: [],
      isLoading: false, // API 호출 등 비동기 작업의 로딩 상태
      isError: false, // 에러 발생 여부 (API 실패 등)
      errorMsg: "",
      fetchTasks: async () => {
        try {
          const response = await fetch(TASKS_API_URL); // API 엔드포인트를 실제로 구현해야 합니다.
          const data = await response.json();
          set({ taskList: data });
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      },
      gettaskById: (id) =>
        get().taskList.find((task) => String(task.id) === String(id)),

      addTask: (val) =>
        set((state) => ({
          taskList: [...state.taskList, { content: val, id: Date.now() }],
        })),
      deleteTask: (id) =>
        set((state) => ({
          taskList: state.taskList.filter((task) => task.id !== id),
        })),
      updateTask: (id, newContent) =>
        set((state) => ({
          taskList: state.taskList.map((task) =>
            task.id === id ? { ...task, content: newContent } : task
          ),
        })),
      clearTasks: () => set({ taskList: [] }),
    }),
    { name: "TaskStore" }
  )
  
);
