import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../reducer/logoutSlice";
import { useEffect, useState } from "react";
import { fetchUserLogin } from "../../reducer/userLoginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hooks untuk Dropdown
  const [isClick, setIsClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Hooks untuk UserLogin
  const { todo, status, error } = useSelector((state) => state.userLogin);
  const todoAcc = todo.user || {};

  const toggleNav = () => {
    setIsClick(!isClick);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    dispatch(fetchLogout())
      .then((response) => {
        if (response) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    dispatch(fetchUserLogin());
  }, [dispatch]);

  return (
    <>
      {todoAcc.role === "admin" && (
        <nav className="bg-[#3E3232]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to={""}
                    className="text-white font-cursive text-2xl font-bold"
                  >
                    Nusantara Food Thesaurus
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    to={"/"}
                    className="text-white hover:bg-[#503C3C] hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/listusers"}
                    className="text-white hover:bg-[#503C3C] hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Users
                  </Link>
                  <Link
                    to={"/listfoods"}
                    className="text-white hover:bg-[#503C3C] hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Foods
                  </Link>
                  <div className="relative">
                    <button
                      className="ml-2 hover:bg-gray-700 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      onClick={toggleDropdown}
                    >
                      <img
                        className="h-10 w-10 rounded-full"
                        src={todoAcc.profilePictureUrl}
                        alt={todoAcc.name}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-[#3E3232] rounded-b-md overflow-hidden shadow-xl z-10">
                        <div className="px-2 py-2">
                          <Link
                            to={"/useraccount"}
                            className="block px-4 py-2 text-sm rounded text-white hover:bg-[#503C3C]"
                          >
                            My Account
                          </Link>
                          <Link
                            to={"/likedfood"}
                            className="block px-4 py-2 text-sm rounded text-white hover:bg-[#503C3C]"
                          >
                            Favorite
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="bg-red-800 block rounded w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleNav}
                  className="inline-flex items-center justify-center p-2 rounded-md"
                >
                  <svg
                    className={`${
                      isClick ? "hidden" : "block"
                    } h-6 w-6 text-white hover:text-[#EFE1D1]`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <svg
                    className={`${
                      isClick ? "block" : "hidden"
                    } h-6 w-6 text-white hover:text-[#EFE1D1]`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isClick && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to={"/"}
                  className="text-white hover:bg-[#503C3C] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  to={"/listusers"}
                  className="text-white hover:bg-[#503C3C] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Users
                </Link>
                <Link
                  to={"/listfoods"}
                  className="text-white hover:bg-[#503C3C] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Foods
                </Link>
                <Link
                  to={"/useraccount"}
                  className="text-white hover:bg-[#503C3C] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  My Account
                </Link>
                <Link
                  to={"/likedfood"}
                  className="text-white hover:bg-[#503C3C] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Liked Food
                </Link>
                <button
                  onClick={handleLogout}
                  className="block bg-red-800 rounded w-full px-3 py-2 text-gray-300 font-medium text-center hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      )}

      {todoAcc.role === "user" && (
        <nav className="bg-[#3E3232]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to={""}
                    className="text-white font-cursive text-2xl font-bold"
                  >
                    Nusantara Food Thesaurus
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    to={"/"}
                    className="text-white hover:bg-[#503C3C] hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/listfoods"}
                    className="text-white hover:bg-[#503C3C] hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Foods
                  </Link>
                  <div className="relative">
                    <button
                      className="text-white ml-2 hover:bg-[#503C3C] hover:text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      onClick={toggleDropdown}
                    >
                      <img
                        className="h-10 w-10 rounded-full"
                        src={todoAcc.profilePictureUrl}
                        alt={todoAcc.name}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-[#3E3232] rounded-b-md overflow-hidden shadow-xl z-10">
                        <div className="px-2 py-2">
                          <Link
                            to={"/useraccount"}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#503C3C] hover:text-gray-300"
                          >
                            My Account
                          </Link>
                          <Link
                            to={"/likedfood"}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#503C3C] hover:text-gray-300"
                          >
                            Favorite
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="bg-red-800 block rounded w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleNav}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <svg
                    className={`${
                      isClick ? "hidden" : "block"
                    } h-6 w-6 text-white hover:text-[#EFE1D1]`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <svg
                    className={`${
                      isClick ? "block" : "hidden"
                    } h-6 w-6 text-white hover:text-[#EFE1D1]`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isClick && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to={"/"}
                  className="text-gray-300 hover:bg-[#503C3C] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  to={"/listfoods"}
                  className="text-gray-300 hover:bg-[#503C3C] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Foods
                </Link>
                <Link
                  to={"/useraccount"}
                  className="text-gray-300 hover:bg-[#503C3C] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  My Account
                </Link>
                <Link
                  to={"/likedfood"}
                  className="text-gray-300 hover:bg-[#503C3C] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Liked Food
                </Link>
                <button
                  onClick={handleLogout}
                  className="block bg-red-800 rounded w-full px-3 py-2 text-white font-medium text-center hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
