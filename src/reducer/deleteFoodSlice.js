import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchDeleteFood = createAsyncThunk(
  "food/fetchDeleteFood",
  async (id) => {
    try {
      const response = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      // console.log(response);
      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "Food Deleted Successfully",
        text: response.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Delete Food",
        icon: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const deleteFoodSlice = createSlice({
  name: "deleteFood",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeleteFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchDeleteFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteFoodSlice.reducer;
