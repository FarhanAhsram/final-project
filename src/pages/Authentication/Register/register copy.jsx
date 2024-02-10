import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister } from "../../../reducer/registerSlice";
import { fetchUploadImage } from "../../../reducer/uploadImageSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerStatus = useSelector((state) => state.register.status);

  const [fileImage, setFileImage] = useState(null);

  // Function Register
  const handleSubmit = async (e, formData) => {
    e.preventDefault();
  
    try {
      await dispatch(fetchRegister(formData));
      navigate("/login");
    } catch (error) {
      console.error("Failed to register or upload image", error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("role", e.target.role.value);
    formData.append("profilePictureUrl", e.target.profilePictureUrl.files[0]);
    formData.append("phoneNumber", e.target.phoneNumber.value);
  
    handleSubmit(e, formData);
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-cyan-100 flex rounded-xl shadow-lg max-w-3x1 p-3">
          {/* Image */}
          <div className="md:block hidden w-1/2">
            <img
              src="images/login-img.jpg"
              className="rounded-md w-4/5 mx-auto"
              alt=""
            />
          </div>

          {/* Form */}
          <div className="md:w-1/2 px-6">
            <h2 className="text-[#7E5344] font-bold text-3xl">Register</h2>
            <p className="text-[#7E5344] font-bold text-sm mt-4">
              Hi there, please fill this form below to make an account
            </p>

            <form
              action=""
              className="flex flex-col gap-2 mt-4 my-auto"
              onSubmit={handleRegisterSubmit}
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
                <option value="admin">Admin</option>
              </select>
              {/* <input
                type="text"
                id="profilePictureUrl"
                name="profilePictureUrl"
                className="p-2 rounded border"
                placeholder="Profile Picture"
                required
              /> */}
              <input
                type="file"
                id="profilePictureUrl"
                name="profilePictureUrl"
                className="p-2 rounded border"
                placeholder="Profile Picture"
                onChange={handleFileChange}
                required
              />
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="p-2 rounded border"
                placeholder="Phone Number"
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