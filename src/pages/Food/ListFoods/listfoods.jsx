import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFood } from "../../../reducer/listFoodSlice";
import { fetchDeleteFood } from "../../../reducer/deleteFoodSlice";
import { fetchUserLogin } from "../../../reducer/userLoginSlice";
import { fetchEditFood } from "../../../reducer/editFoodSlice";
import { fetchCreateFood } from "../../../reducer/createFoodSlice";
import { fetchUploadImage } from "../../../reducer/uploadImageSlice";

import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import Loading from "../../../components/Loading/loading";
import EditFoodModal from "../../../components/FoodsComp/EditFoodModal/editfoodmodal";
import CreateFoodModal from "../../../components/FoodsComp/CreateFoodModal/createfoodmodal";

const ListFoods = () => {
  const dispatch = useDispatch();

  // Hooks Selector List Food
  const foods = useSelector((state) => state.food.todo.data);
  const status = useSelector((state) => state.food.status);
  const error = useSelector((state) => state.food.error);

  // Hooks Selector User Login
  const { todo, stat, err } = useSelector((state) => state.userLogin);
  const todoAcc = todo.user || {};

  // Hooks Selector & State Create Food
  const foodStatus = useSelector((state) => state.createFood.status);
  const [isOpen, setIsOpen] = useState(false);

  // Hooks State Edit Food
  const [editModalFood, setEditModalFood] = useState(false);
  const [foodId, setFoodId] = useState({ id: null });
  const [editedFood, setEditedFood] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
  });

  useEffect(() => {
    dispatch(fetchFood());
    dispatch(fetchUserLogin());
  }, [dispatch]);

  const handleEditFood = (foodData) => {
    setFoodId({ id: foodData.id });
    setEditedFood({
      id: foodData.id,
      name: foodData.name,
      description: foodData.description,
      imageUrl: foodData.imageUrl,
      ingredients: foodData.ingredients,
    });
    setEditModalFood(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFood({
      ...editedFood,
      [name]: value,
    });
  };

  const handleModalClose = () => {
    setEditModalFood(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Function Create Food
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientsArray = e.target.ingredients.value
      .split(",")
      .map((ingredient) => ingredient.trim());

    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      imageUrl: e.target.imageUrl.value,
      ingredients: ingredientsArray,
    };

    dispatch(fetchCreateFood(formData))
      .then((response) => {
        if (response.payload) {
          toggleModal(false);
        }
      })
      .catch((error) => {
        console.error("Failed to create food", error);
      });
  };

  // Function Edit Food
  const handleSaveFood = () => {
    const id = foodId;
    // console.log(id);
    const ingredients = Array.isArray(editedFood.ingredients)
      ? editedFood.ingredients
      : editedFood.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim());

    const editedFoodData = {
      ...editedFood,
      ingredients: ingredients,
    };

    dispatch(fetchEditFood({ id: id.id, foodData: editedFoodData }))
      .then(() => {
        setEditModalFood(false);
      })
      .catch((error) => {
        console.error("Failed to update food:", error);
      });
  };

  // Function Delete Food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Food?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchDeleteFood(id))
          .unwrap()
          .then((data) => {
            console.log("Food deleted successfully:", data);

            Swal.fire({
              title: "Success",
              text: data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.error("Failed to delete food", error);

            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // console.log("todo", foods);
  // console.log("status", status);
  // console.log("error", error);

  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />

      {status === "loading" && foods && <Loading />}

      {todoAcc.role === "admin" && status === "succeeded" && foods && (
        <div>
          <div className="flex w-full mt-6 mb-6">
            <div className="w-1/3 flex items-center justify-center">
              <button
                className="w-20 h-20 text-md font-medium text-center text-white bg-[#503C3C] rounded-full"
                onClick={toggleModal}
              >
                Create Menu
              </button>
            </div>
            <div className="w-2/3 my-auto">
              <h1 className="text-5xl font-cursive font-semibold ml-20">
                List of Food
              </h1>
            </div>
          </div>

          <div className="container flex items-center justify-center mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foods.map((food) => (
                <div className="bg-[#503C3C] rounded-xl shadow-lg">
                  <div className="p-5 flex flex-col">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="rounded-xl overflow-hidden w-full h-48"
                    />
                    <h2 className="text-white text-lg font-medium mt-3">
                      {food.name}
                    </h2>
                    <div className="flex justify-center mt-4 gap-8">
                      <Link
                        to={`/detailfood/${food.id}`}
                        className="items-center w-24 px-3 py-2 text-sm font-medium text-center text-white bg-[#945d5d] rounded-lg hover:bg-[#EFE1D1] hover:text-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Detail
                      </Link>
                      <Link
                        // to={`/editfood/${food.id}`}
                        className="items-center w-24 px-3 py-2 text-sm font-medium text-center text-white bg-[#A87C7C] rounded-lg hover:bg-[#EFE1D1] hover:text-slate-950 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                        onClick={() => handleEditFood(food)}
                      >
                        Edit
                      </Link>
                      <button
                        className="items-center w-24 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => handleDelete(food.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {todoAcc.role === "user" && status === "succeeded" && foods && (
        <div>
          <h1 className="text-5xl font-cursive font-semibold mt-10 mb-4 text-center">
            List of Food
          </h1>

          <div className="container flex items-center justify-center mx-auto mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foods.map((food) => (
                <div className="bg-[#503C3C] rounded-xl shadow-lg">
                  <div className="p-5 flex flex-col">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="rounded-xl overflow-hidden w-full h-48 hover:shadow-lg transition duration-300 ease-in-out"
                    />
                    <h2 className="text-lg text-white font-medium mt-3">
                      {food.name}
                    </h2>
                    <Link
                      to={`/detailfood/${food.id}`}
                      className="text-center bg-[#A87C7C] text-white py-2 rounded-lg font-semibold mt-4 hover:bg-[#EFE1D1] hover:text-slate-950 focus:scale-95 transition-all duration-200 ease-out"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <CreateFoodModal
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        foodStatus={foodStatus}
        toggleModal={toggleModal}
      />

      <EditFoodModal
        isOpen={editModalFood}
        editedFood={editedFood}
        handleSaveFood={handleSaveFood}
        handleModalClose={handleModalClose}
        handleInputChange={handleInputChange}
      />

      <Footer />
    </div>
  );
};

export default ListFoods;
