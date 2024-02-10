import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchUploadImage = createAsyncThunk(
  "image/fetchUploadImage",
  async ({ fileImage }) => {
    try {
      const formData = new FormData();
      formData.append("image", fileImage);

      const response = await fetch(
        "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        {
          method: "POST",
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            APIKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "Image Uploaded",
        text: data.message,
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed to Upload Image",
        text: error,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchUploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default uploadImageSlice.reducer;
