import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const addTodo = createAsyncThunk("todos/add", async (text, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/todos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
      }),
    });
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todos/");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/remove",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/delete/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, doned }, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/todos/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doned: !doned,
        }),
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item._id === action.payload) {
            item.doned = !item.doned;
          }
          return item;
        });
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
