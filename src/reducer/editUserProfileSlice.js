import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchEditUserProfile = createAsyncThunk(
  "user/fetchEditUserProfile",
  async ({ userData }) => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
          body: JSON.stringify(userData),
        }
      );

      // console.log(response);
      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "User Edited Successfully",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Edit User",
        icon: error.message,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const editUserProfile = createSlice({
  name: "editUserProfile",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEditUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userData } = action.payload;

        state.response = { ...userData };
      })
      .addCase(fetchEditUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editUserProfile.reducer;
