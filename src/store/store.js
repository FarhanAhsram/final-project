import { configureStore } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import loginReducer from "../reducer/loginSlice";
import registerReducer from "../reducer/registerSlice";
import logoutReducer from "../reducer/logoutSlice";
import userReducer from "../reducer/listUserSlice";
import userLoginReducer from "../reducer/userLoginSlice";
import editUserProfileReducer from "../reducer/editUserProfileSlice";
import editUserRoleReducer from "../reducer/editUserRoleSlice";
import foodReducer from "../reducer/listFoodSlice";
import likedFoodReducer from "../reducer/likedFoodSlice";
import detailFoodReducer from "../reducer/detailFoodSlice ";
import createFoodReducer from "../reducer/createFoodSlice";
import editFoodReducer from "../reducer/editFoodSlice";
import deleteFoodReducer from "../reducer/deleteFoodSlice";
import createRatingReducer from "../reducer/createRatingSlice";
import getRatingReducer from "../reducer/getRatingSlice";
import foodLikeReducer from "../reducer/foodLikeSlice";
import foodUnlikeReducer from "../reducer/foodUnlikeSlice";

const saveTokenMiddleware = () => (next) => (action) => {
  if (action.type === "login/fetchLogin/fulfilled") {
    const response = action.payload;
    const token = response.token;

    localStorage.setItem("accessToken", token);
    Swal.fire({
      title: "Login Successful",
      text: response.message,
      icon: "success",
      showConfirmButton: true,
    });
  }

  next(action);
};

const clearTokenMiddleware = () => (next) => (action) => {
  if (action.type === "logout/fetchLogout/fulfilled") {
    localStorage.removeItem("accessToken");
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,

    user: userReducer,
    userLogin: userLoginReducer,
    editUserProfile: editUserProfileReducer,
    editUserRole: editUserRoleReducer,

    food: foodReducer,
    likedFood: likedFoodReducer,
    detailFood: detailFoodReducer,
    createFood: createFoodReducer,
    editFood: editFoodReducer,
    deleteFood: deleteFoodReducer,

    foodLike: foodLikeReducer,
    foodUnlike: foodUnlikeReducer,

    createRating: createRatingReducer,
    getRating: getRatingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(saveTokenMiddleware)
      .concat(clearTokenMiddleware),
});
