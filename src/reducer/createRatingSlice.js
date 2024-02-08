import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchCreateRating = createAsyncThunk(
  "food/fetchCreateRating",
  async ({ id, ratingData }) => {
    try {
      const response = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
          body: JSON.stringify(ratingData),
        }
      );

      // console.log(response);
      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "Food Rating Created",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Rate Food",
        icon: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const createRatingSlice = createSlice({
  name: "createRating",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchCreateRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default createRatingSlice.reducer;
