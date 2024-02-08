import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEditFood } from "../../../reducer/editFoodSlice";
import Footer from "../../../components/Footer/footer";
import Navbar from "../../../components/Navbar/navbar";

const EditFood = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
  });

  useEffect(() => {
    setFormData({
      id: id,
      name: name,
      description: description,
      imageUrl: imageUrl,
      ingredients: ingredients,
    });
  }, [id]);

  const handleSaveFood = (e) => {
    dispatch(fetchEditFood(formData));
  }

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Menu</h2>
        <form action="">
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
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
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
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
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
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageUrl: e.target.value,
                })
              }
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
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ingredients: e.target.value,
                })
              }
              className="mt-1 p-2 border rounded-md w-full"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-7"
              onClick={handleSaveFood}
            >
              Edit Food
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default EditFood;