import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (userData) => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      // console.log(data);

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: "Login Unsuccessful",
        text: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
