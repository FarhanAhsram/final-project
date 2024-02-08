import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchLogout = createAsyncThunk("logout/fetchLogout", async () => {
  try {
    const response = await fetch(
      "https://api-bootcamp.do.dibimbing.id/api/v1/logout",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);

    if (data.code !== "200") {
      throw new Error(data.message);
    }

    // console.log(response);
    Swal.fire({
      title: "Logout Successful",
      text: data.message,
      icon: "success",
      showConfirmButton: true,
    });

    return data;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Logout Unsuccessful",
      text: error,
      icon: "error",
      showConfirmButton: true,
    });
    throw error;
  }
});

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
