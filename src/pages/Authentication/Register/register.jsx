import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../../reducer/registerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerStatus = useSelector((state) => state.register.status);

  const [fileImage, setFileImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    phoneNumber: "",
  });

  const handleImage = (event) => {
    setFileImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (!fileImage) {
        throw new Error("Please select an image to upload.");
      }
      const formData = new FormData();
      formData.append("image", fileImage);
      
      const imageUploadResponse = await axios.post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const profilePictureUrl = imageUploadResponse.data.url;

      const userData = {
        ...form,
        profilePictureUrl: profilePictureUrl,
      };

      dispatch(fetchRegister(userData))
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-[#EFE1D1] flex rounded-xl shadow-lg max-w-3x1 p-3">
          {/* Image */}
          <div className="md:block hidden w-1/2">
            <img
              src="images/login-img.jpg"
              className="rounded w-4/5 mx-auto"
              alt=""
            />
          </div>

          {/* Form */}
          <div className="md:w-1/2 px-6">
            <h2 className="text-[#7E5344] font-bold text-2xl">Register</h2>
            <p className="text-[#7E5344] font-bold text-sm mt-4">
              Hi there, please fill this form below to make an account
            </p>

            <div className="flex flex-col gap-2 mt-4 my-auto">
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Password"
                required
              />
              <input
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Repeat Password"
                required
              />
              <select
                id="role"
                name="role"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <input
                type="file"
                id="profilePictureUrl"
                name="profilePictureUrl"
                onChange={handleImage}
                className="p-2 rounded border"
                placeholder="Image Url"
                required
              />
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Phone Number"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#7E5344] text-white rounded-xl py-2 mt-3 mb-2 hover:bg-[#513a29] focus:outline-none focus:shadow-outline-blue"
            >
              {registerStatus === "loading" ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Already Have an Account?{" "}
              <Link
                to={"/login"}
                className="text-[#7E5344] hover:text-[#513a29] font-bold underline"
              >
                Sign In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
