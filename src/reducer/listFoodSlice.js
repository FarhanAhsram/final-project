import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFood = createAsyncThunk("food/fetchFood", async () => {
  try {
    const response = await fetch(
      "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      }
    );

    // console.log(response);
    const data = await response.json();

    return data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
});

const foodSlice = createSlice({
  name: "food",
  initialState: {
    todo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
