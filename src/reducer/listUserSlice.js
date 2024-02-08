import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await fetch(
      "https://api-bootcamp.do.dibimbing.id/api/v1/all-user",
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
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    todo: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
