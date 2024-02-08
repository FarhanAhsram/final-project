import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../reducer/listUserSlice";
import { fetchUserLogin } from "../../../reducer/userLoginSlice";
import { fetchEditUserRole } from "../../../reducer/editUserRoleSlice";

import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import Loading from "../../../components/Loading/loading";
import EditRoleModal from "../../../components/UsersComp/EditRoleModal/editrolemodal";

const ListUsers = () => {
  const dispatch = useDispatch();

  // Variable untuk List Users
  const users = useSelector((state) => state.user.todo.data);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Variable untuk List Users
  const { todo } = useSelector((state) => state.userLogin);
  const todoAcc = todo.user || {};

  // Variable untuk Edit Role
  const [editModalRole, setEditModalRole] = useState(false);
  const [editedUser, setEditedUser] = useState({ id: null, role: "" });

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserLogin());
  }, [dispatch]);

  const handleEditRole = (userData) => {
    setEditedUser({ id: userData.id, role: userData.role });
    setEditModalRole(true);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      role: e.target.value,
    });
  };

  const handleSaveEdit = () => {
    dispatch(fetchEditUserRole(editedUser));
    setEditModalRole(false);
  };

  const handleModalClose = () => {
    setEditModalRole(false);
  };

  // console.log("todo", users);
  // console.log("status", status);
  // console.log("error", error);

  return (
    <>
      <Navbar />
      {todoAcc.role === "admin" && status === "loading" && users && <Loading />}

      {todoAcc.role === "admin" && status === "succeeded" && users && (
        <div>
          <h1 className="text-3xl font-semibold mt-3 mb-3 text-center">
            List of User
          </h1>
          <div className="container flex items-center justify-center mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-slate-500"
                >
                  {user.profilePictureUrl ? (
                    <img
                      className="w-48 h-48 mx-auto rounded-full mt-4"
                      src={user.profilePictureUrl}
                      alt={user.name}
                    />
                  ) : (
                    <img
                      className="w-48 h-48 mx-auto rounded-full mt-4"
                      src="images/avatar.png"
                      alt={user.name}
                    />
                  )}
                  <div className="text-center px-6 py-4">
                    <h5 className="font-bold text-xl mb-2">{user.name}</h5>
                    <p className="text-gray-700 text-base">{user.role}</p>
                  </div>
                  <div className="flex justify-center mb-4 gap-8">
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleEditRole(user)}
                    >
                      Edit Role
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* {todoAcc.role !== "admin" && (
        <div className="text-6xl text-center text-red-500 mt-48 mb-52">
          You are not authorized to view this list.
        </div>
      )} */}

      <EditRoleModal
        isOpen={editModalRole}
        editedUser={editedUser}
        handleSaveEdit={handleSaveEdit}
        handleModalClose={handleModalClose}
        handleInputChange={handleInputChange}
      />

      <Footer />
    </>
  );
};

export default ListUsers;
