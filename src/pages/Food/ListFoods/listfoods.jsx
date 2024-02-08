import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchFood } from "../../../reducer/listFoodSlice";
import { fetchDeleteFood } from "../../../reducer/deleteFoodSlice";
import { fetchUserLogin } from "../../../reducer/userLoginSlice";

import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import Loading from "../../../components/Loading/loading";

const ListFoods = () => {
  const dispatch = useDispatch();

  // Hooks untuk ListFood
  const foods = useSelector((state) => state.food.todo.data);
  const status = useSelector((state) => state.food.status);
  const error = useSelector((state) => state.food.error);

  // Hooks untuk UserLogin
  const { todo, stat, err } = useSelector((state) => state.userLogin);
  const todoAcc = todo.user || {};

  useEffect(() => {
    dispatch(fetchFood());
    dispatch(fetchUserLogin());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
  });

  const handleEditFood = (e) => {
    setFormData({
      id: e.id,
      name: e.name,
      description: e.description,
      imageUrl: e.imageUrl,
      ingredients: e.ingredients,
    });
  };

  // Function untuk Delete Food
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
    <>
      <Navbar />
      <h1 className="text-3xl font-semibold mt-3 mb-3 text-center">
        List of Food
      </h1>
      {status === "loading" && foods && <Loading />}

      {todoAcc.role === "admin" && status === "succeeded" && foods && (
        <div>
          <Link to={"/createfood"}>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2"
            >
              Create Menu
            </button>
          </Link>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {foods.map((food) => (
              <div
                key={food.id}
                className="relative max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              >
                <img
                  className="object-cover w-full h-48"
                  src={food.imageUrl}
                  alt={food.name}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {food.description}
                  </p>
                  <Link
                    to={`/detailfood/${food.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/editfood/${food.id}`}
                    className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-900"
                    onClick={() => handleEditFood(food)}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {todoAcc.role === "user" && status === "succeeded" && foods && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {foods.map((food) => (
            <div
              key={food.id}
              className="relative max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              <img
                className="object-cover w-full h-48"
                src={food.imageUrl}
                alt={food.name}
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {food.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {food.description}
                </p>
                <Link
                  to={`/detailfood/${food.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default ListFoods;
