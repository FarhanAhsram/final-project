import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLikedFood = createAsyncThunk(
  "food/fetchLikedFood",
  async () => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/like-foods",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      // console.log(response);
      const data = await response.json();

      return data;
    } catch (error) {
    //   console.log(error);
      throw error;
    }
  }
);

const likedFoodSlice = createSlice({
  name: "likedFood",
  initialState: {
    todo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLikedFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchLikedFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default likedFoodSlice.reducer;
