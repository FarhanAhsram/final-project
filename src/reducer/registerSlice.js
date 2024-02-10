import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (userData) => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/register",
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

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      // console.log(response);
      Swal.fire({
        title: "Register Successful",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log("Error pada try catch", error);
      Swal.fire({
        title: "Register Unsuccessful",
        text: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const RegisterSlice = createSlice({
  name: "Register",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default RegisterSlice.reducer;
