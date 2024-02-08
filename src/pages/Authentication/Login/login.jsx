import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin } from "../../../reducer/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const response = useSelector((state) => state.login.response);
  const status = useSelector((state) => state.login.status);
  const error = useSelector((state) => state.login.error);

  // console.log("Email", email);
  // console.log("Password", password);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchLogin({ email, password }))
      .then((response) => {
        if (response.payload && response.payload.token) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* Login Container */}
        <div className="bg-cyan-100 flex rounded-xl shadow-lg max-w-3x1 p-5">
          {/* Form */}
          <div className="sm:w-1/2 px-6 my-auto">
            <h2 className="text-[#F8C74F] font-bold text-2xl">Login</h2>
            <p className="text-[#F8C74F] font-bold text-sm mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              amet.
            </p>

            <form action="" className="flex flex-col gap-3 mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded border"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded border"
                required
              />

              <button
                type="submit"
                className="bg-[#F8C74F] rounded-xl py-2 mt-3 mb-2 hover:bg-[#F5A800] focus:outline-none focus:shadow-outline-blue"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                Login
              </button>

              <p className="text-sm text-gray-600 text-center">
                Don't Have an Account?{" "}
                <Link
                  to={"/register"}
                  className="text-[#F8C74F] hover:text-[#F5A800] font-bold underline"
                >
                  Sign Up Now
                </Link>
              </p>
            </form>
          </div>

          {/* Image */}
          <div className="sm:block hidden w-1/2">
            <img src="images/login-img.jpg" className="rounded w-2/3 mx-auto" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
