import { useDispatch, useSelector } from "react-redux";
import { fetchLikedFood } from "../../../reducer/likedFoodSlice";
import { useEffect } from "react";

import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import Loading from "../../../components/Loading/loading";

const LikedFood = () => {
  const dispatch = useDispatch();

  // Variabel untuk LikedFoods
  const likedFoods = useSelector((state) => state.likedFood.todo.data);
  const status = useSelector((state) => state.likedFood.status);
  const error = useSelector((state) => state.likedFood.error);

  useEffect(() => {
    dispatch(fetchLikedFood());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-semibold mt-3 mb-3 text-center">Liked Food</h1>

      {status === "loading" && likedFoods && <Loading />}

      {status === "succeeded" && likedFoods && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {likedFoods.map((likedFood) => (
            <div
              key={likedFood.id}
              className="relative max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            >
              <img
                className="object-cover w-full h-48"
                src={likedFood.imageUrl}
                alt={likedFood.name}
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {likedFood.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {likedFood.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {status === "failed" && <div>Error: {error}</div>}
      <Footer />
    </>
  );
};

export default LikedFood;
