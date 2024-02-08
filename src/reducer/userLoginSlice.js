import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async () => {
    try {
      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      // console.log(response);
      const data = await response.json();

      return data;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
);

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    todo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userLoginSlice.reducer;
