import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "../../../reducer/userLoginSlice";
import { fetchEditUserProfile } from "../../../reducer/editUserProfileSlice";

import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import EditProfileModal from "../../../components/UsersComp/EditProfileModal/editprofilemodal";

const UserAccount = () => {
  const dispatch = useDispatch();

  // Variabel untuk UserAccount
  const { todo, status, error } = useSelector((state) => state.userLogin);
  const todoAcc = todo.user || {};

  // Variabel untuk EditProfile
  const [editUserProfile, setEditUserProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: todoAcc.name,
    email: todoAcc.email,
    profilePictureUrl: todoAcc.profilePictureUrl,
    phoneNumber: todoAcc.phoneNumber,
  });

  useEffect(() => {
    dispatch(fetchUserLogin());
  }, [dispatch]);

  const handleEdit = (userData) => {
    setFormData({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      profilePictureUrl: userData.profilePictureUrl,
      phoneNumber: userData.phoneNumber,
    });
    setEditUserProfile(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveEdit = () => {
    dispatch(fetchEditUserProfile({ userData: formData }))
      .then(() => {
        setEditUserProfile(false);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  };

  const handleModalClose = () => {
    setEditUserProfile(false);
  };

  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />

      <h1 className="text-3xl font-semibold mt-3 mb-3 text-center">
        My Account
      </h1>

      <div className="w-full max-w-md rounded-lg bg-[#EFE1D1] p-4 mx-auto">
        <img
          className="w-48 h-48 mx-auto rounded-full"
          src={todoAcc.profilePictureUrl}
          alt={todoAcc.name}
        />
        <div className="p-5 text-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {todoAcc.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700">{todoAcc.email}</p>
          <p className="mb-3 font-normal text-gray-700">{todoAcc.role}</p>
          <p className="mb-3 font-normal text-gray-700">
            {todoAcc.phoneNumber}
          </p>
          <button
            onClick={() => handleEdit(todoAcc)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update Profile
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={editUserProfile}
        formData={formData}
        handleSaveEdit={handleSaveEdit}
        handleModalClose={handleModalClose}
        handleInputChange={handleInputChange}
      />

      <Footer />
    </div>
  );
};

export default UserAccount;
