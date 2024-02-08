import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDetailFood = createAsyncThunk(
  "food/fetchDetailFood",
  async (id) => {
    try {
      const response = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
  }
);

const detailFoodSlice = createSlice({
  name: "detailFood",
  initialState: {
    todo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchDetailFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default detailFoodSlice.reducer;
