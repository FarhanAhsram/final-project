import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchEditUserRole = createAsyncThunk(
  "user/fetchEditUserRole",
  async ({ id, userData }) => {
    try {
      const response = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
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
        title: "User Role Edited Successfully",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed to Edit User Role",
        text: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const editUserRoleSlice = createSlice({
  name: "editUserRole",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEditUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, userData } = action.payload;

        state.response = { id, ...userData };
      })
      .addCase(fetchEditUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editUserRoleSlice.reducer;
