import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchCreateFood = createAsyncThunk(
  "food/fetchCreateFood",
  async (foodData) => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/create-food",
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
        title: "Food Created Successfully",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Create Food",
        icon: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const createFoodSlice = createSlice({
  name: "createFood",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateFood.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchCreateFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default createFoodSlice.reducer;
