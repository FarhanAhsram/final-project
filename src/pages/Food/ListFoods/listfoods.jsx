import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFood } from "../../../reducer/listFoodSlice";
import { fetchDeleteFood } from "../../../reducer/deleteFoodSlice";
import { fetchUserLogin } from "../../../reducer/userLoginSlice";
import { fetchEditFood } from "../../../reducer/editFoodSlice";
import { fetchCreateFood } from "../../../reducer/createFoodSlice";

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
  const [fileImage, setFileImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    ingredients: [],
  });

  // Hooks State Edit Food
  const [editModalFood, setEditModalFood] = useState(false);
  const [foodId, setFoodId] = useState({ id: null });
  const [editImage, setEditImage] = useState(null);
  const [editedFood, setEditedFood] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: [],
  });

  useEffect(() => {
    dispatch(fetchFood());
    dispatch(fetchUserLogin());
  }, [dispatch]);

  // Function Create Food (handle Image)
  const handleImage = (event) => {
    setFileImage(event.target.files[0]);
  };

  // Function Create Food (on Change)
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "ingredients") {
      const ingredientsArray = value.split(",");
      setForm({
        ...form,
        [name]: ingredientsArray,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // Function Create Food (Submit Create)
  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (!fileImage) {
        throw new Error("Please select an image to upload.");
      }
      const formImg = new FormData();
      formImg.append("image", fileImage);

      const imageUploadResponse = await axios.post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formImg,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const imageUrl = imageUploadResponse.data.url;

      const formData = {
        ...form,
        imageUrl: imageUrl,
      };

      dispatch(fetchCreateFood(formData))
        .unwrap()
        .then(() => {
          toggleModal(false);
          dispatch(fetchFood());
        })
        .catch((error) => {
          console.error("Failed to create food", error);
        });
    } catch (error) {
      console.error("Failed to create food", error);
    }
  };

  // Function Edit Food (get Data)
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

  const handleImageEdit = (event) => {
    setEditImage(event.target.files[0]);
  };

  // Function Edit Food (on Change)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFood({
      ...editedFood,
      [name]: value,
    });
  };

  // Function Edit Food (Submit Edit)
  const handleSaveFood = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      let imageFoodUrl = editedFood.imageUrl;

      if (editImage) {
        const formImgEdit = new FormData();
        formImgEdit.append("image", editImage);

        const imageUploadResponse = await axios.post(
          "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image",
          formImgEdit,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "multipart/form-data",
              apiKey: "w05KkI9AWhKxzvPFtXotUva-",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        imageFoodUrl = imageUploadResponse.data.url;
      }

      const id = foodId;

      const ingredients = Array.isArray(editedFood.ingredients)
        ? editedFood.ingredients
        : editedFood.ingredients
            .split(",")
            .map((ingredient) => ingredient.trim());

      const editedFoodData = {
        ...editedFood,
        imageUrl: imageFoodUrl,
        ingredients: ingredients,
      };

      dispatch(fetchEditFood({ id: id.id, foodData: editedFoodData }))
        .unwrap()
        .then(() => {
          dispatch(fetchFood());
          setEditModalFood(false);
        })
        .catch((error) => {
          console.error("Failed to update food:", error);
        });
    } catch (error) {
      console.error("Failed to update food:", error);
    }
  };

  // Function Delete Food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Food?",
      text: "You cannot change this action again!",
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
            dispatch(fetchFood());
            Swal.fire({
              title: "Food Deleted Successfully",
              text: data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.error("Failed to delete food", error);

            Swal.fire({
              title: "Failed to Create Food",
              text: data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // Toggle Create Food
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Edit Food
  const handleModalClose = () => {
    setEditModalFood(false);
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
        handleChange={handleChange}
        handleImage={handleImage}
        handleSubmit={handleSubmit}
        foodStatus={foodStatus}
        toggleModal={toggleModal}
      />

      <EditFoodModal
        isOpen={editModalFood}
        editedFood={editedFood}
        handleInputChange={handleInputChange}
        handleImageEdit={handleImageEdit}
        handleSaveFood={handleSaveFood}
        handleModalClose={handleModalClose}
      />

      <Footer />
    </div>
  );
};

export default ListFoods;
