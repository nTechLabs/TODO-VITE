import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItems: [], // { id, text, completed }
  editTodo: null, // { id, text, completed } or null
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoItems: (state, action) => {
      state.todoItems = action.payload;
    },
    addTodo: (state, action) => {
      state.todoItems.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todoItems = state.todoItems.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todoItems.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    setEditTodo: (state, action) => {
      state.editTodo = action.payload;
    },
    updateTodo: (state, action) => {
      const idx = state.todoItems.findIndex(todo => todo.id === action.payload.id);
      if (idx !== -1) state.todoItems[idx] = action.payload;
      state.editTodo = null;
    },
    clearEditTodo: (state) => {
      state.editTodo = null;
    },
  },
});

export const todoActs = todoSlice.actions;
export default todoSlice;
