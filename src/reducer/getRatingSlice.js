import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGetRating = createAsyncThunk(
  "food/fetchGetRating",
  async (id) => {
    try {
      const response = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${id}`,
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

const getRatingSlice = createSlice({
  name: "getRating",
  initialState: {
    todo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchGetRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getRatingSlice.reducer;
