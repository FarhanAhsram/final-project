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
    <div className="bg-emerald-200">
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

          <div className="container flex items-center justify-center min-h-screen mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foods.map((food) => (
                <div className="bg-gray-300 rounded-xl shadow-lg">
                  <div className="p-5 flex flex-col">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="rounded-xl overflow-hidden w-full h-48"
                    />
                    <h2 className="text-1xl md:text-3xl font-medium mt-3">
                      {food.name}
                    </h2>
                    <Link
                      to={`/detailfood/${food.id}`}
                      className="text-center bg-blue-500 text-blue-700 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out"
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/editfood/${food.id}`}
                      className="text-center bg-amber-500 text-amber-700 py-2 rounded-lg font-semibold mt-4 hover:bg-amber-300 focus:scale-95 transition-all duration-200 ease-out"
                      onClick={() => handleEditFood(food)}
                    >
                      Edit
                    </Link>
                    <button
                      className="text-center bg-red-500 text-red-700 py-2 rounded-lg font-semibold mt-4 hover:bg-red-300 focus:scale-95 transition-all duration-200 ease-out"
                      onClick={() => handleDelete(food.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {todoAcc.role === "user" && status === "succeeded" && foods && (
        <div className="container flex items-center justify-center min-h-screen mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <div className="bg-gray-300 rounded-xl shadow-lg">
                <div className="p-5 flex flex-col">
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="rounded-xl overflow-hidden w-full h-48 hover:shadow-lg transition duration-300 ease-in-out"
                  />
                  <h2 className="text-1xl md:text-3xl font-medium mt-3">
                    {food.name}
                  </h2>
                  <p className="text-slate-800 mt-3">{food.description}</p>
                  <Link
                    to={`/detailfood/${food.id}`}
                    className="text-center bg-blue-500 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ListFoods;
