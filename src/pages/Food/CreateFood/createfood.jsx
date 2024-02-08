import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCreateFood } from "../../../reducer/createFoodSlice";
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";

const CreateFood = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const foodStatus = useSelector((state) => state.createFood.status);

  // Function untuk Create Food
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
          navigate("/listfoods");
        }
      })
      .catch((error) => {
        console.error("Failed to create food", error);
      });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto mt-4 p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Menu</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 p-2 border rounded-md w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-600"
            >
              Food Image
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-600"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="mt-1 p-2 border rounded-md w-full"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-7"
            >
              {foodStatus === "loading" ? "Adding..." : "Add Menu"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateFood;
