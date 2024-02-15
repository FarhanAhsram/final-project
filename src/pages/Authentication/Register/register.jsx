import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister } from "../../../reducer/registerSlice";
import { fetchUploadImage } from "../../../reducer/uploadImageSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerStatus = useSelector((state) => state.register.status);

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, "").slice(0, 13);
    e.target.value = phoneNumber;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      passwordRepeat: e.target.passwordRepeat.value,
      role: e.target.role.value,
      profilePictureUrl: e.target.profilePictureUrl.value,
      phoneNumber: e.target.phoneNumber.value,
    };

    dispatch(fetchRegister(registerData))
      .then((response) => {
        if (response.payload) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Failed to register", error);
      });
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

            <form
              action=""
              className="flex flex-col gap-2 mt-4 my-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                id="name"
                name="name"
                className="p-2 rounded border"
                placeholder="Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                className="p-2 rounded border"
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                className="p-2 rounded border"
                placeholder="Password"
                required
              />
              <input
                type="password"
                id="passwordRepeat"
                name="passwordRepeat"
                className="p-2 rounded border"
                placeholder="Repeat Password"
                required
              />
              <select
                id="role"
                name="role"
                className="w-full border p-2 rounded"
                required
              >
                <option value="user">User</option>
              </select>
              <input
                type="text"
                id="profilePictureUrl"
                name="profilePictureUrl"
                className="p-2 rounded border"
                placeholder="Image Url"
                required
              />
              {/* <input
                type="file"
                id="profilePictureUrl"
                name="profilePictureUrl"
                className="p-2 rounded border"
                placeholder="Image Url"
                required
              /> */}
              {/* <input
                type="file"
                id="profilePictureUrl"
                name="profilePictureUrl"
                className="p-2 rounded border"
                onChange={handleFileChange}
                accept="image/*"
                required
              /> */}
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="p-2 rounded border"
                placeholder="Phone Number"
                onChange={handlePhoneNumberChange}
                required
              />

              <button
                type="submit"
                className="bg-[#7E5344] text-white rounded-xl py-2 mt-3 mb-2 hover:bg-[#513a29] focus:outline-none focus:shadow-outline-blue"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
