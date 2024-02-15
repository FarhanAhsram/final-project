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

  // Hooks Selector List Users
  const users = useSelector((state) => state.user.todo.data);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Hooks Selector User Login
  const { todo } = useSelector((state) => state.userLogin);
  const todoAcc = todo.user || {};

  // Hooks State Edit Role
  const [editModalRole, setEditModalRole] = useState(false);
  const [editedUser, setEditedUser] = useState({ role: "" });
  const [roleId, setRoleId] = useState({ id: null });

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserLogin());
  }, [dispatch]);

  const handleEditRole = (userData) => {
    setRoleId({ id: userData.id });
    setEditedUser({ role: userData.role });
    setEditModalRole(true);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      role: e.target.value,
    });
  };

  const handleModalClose = () => {
    setEditModalRole(false);
  };

  // Function Edit Role
  const handleSaveEdit = () => {
    const id = roleId;
    // console.log(id);

    dispatch(fetchEditUserRole({ id:id.id , userData: editedUser }))
      .then(() => {
        setEditModalRole(false);
        dispatch(fetchUser());
      })
      .catch((error) => {
        console.error("Failed to update role:", error);
      });
  };

  // console.log("todo", users);
  // console.log("status", status);
  // console.log("error", error);

  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />
      {todoAcc.role === "admin" && status === "loading" && users && <Loading />}

      {todoAcc.role === "admin" && status === "succeeded" && users && (
        <div>
          <h1 className="text-5xl font-cursive font-semibold mt-8 mb-8 text-center">
            List of User
          </h1>
          <div className="container flex items-center justify-center mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-[#503C3C]"
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
                    <h5 className="text-white font-bold text-xl mb-2">
                      {user.name}
                    </h5>
                    <p className="text-white text-base">{user.role}</p>
                  </div>
                  <div className="flex justify-center mb-4 gap-8">
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#3E3232] rounded-lg hover:bg-[#EFE1D1] hover:text-black focus:ring-4 focus:outline-none"
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
    </div>
  );
};

export default ListUsers;
