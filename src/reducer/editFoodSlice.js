import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchEditFood = createAsyncThunk(
  "food/fetchEditFood",
  async ({ id, foodData }) => {
    try {
      const response = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
          body: JSON.stringify(foodData),
        }
      );

      // console.log(response);
      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "Food Edited Successfully",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Edit Food",
        text: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const editFoodSlice = createSlice({
  name: "editFood",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEditFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, foodData } = action.payload;

        state.response = { id, ...foodData };
      })
      .addCase(fetchEditFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editFoodSlice.reducer;
