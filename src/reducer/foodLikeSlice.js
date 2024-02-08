import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchFoodLike = createAsyncThunk(
  "food/fetchFoodLike",
  async (id) => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
          body: JSON.stringify(id),
        }
      );

      // console.log(response);
      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "Liked Food",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Liked Food",
        icon: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const foodLikeSlice = createSlice({
  name: "foodLike",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoodLike.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchFoodLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default foodLikeSlice.reducer;
