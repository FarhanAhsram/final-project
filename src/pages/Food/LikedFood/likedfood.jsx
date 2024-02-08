import { useDispatch, useSelector } from "react-redux";
import { fetchLikedFood } from "../../../reducer/likedFoodSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1 className="text-3xl font-semibold mt-3 mb-3 text-center">
        Liked Food
      </h1>

      {status === "loading" && likedFoods && <Loading />}

      {status === "succeeded" && likedFoods && (
        <div className="container flex items-center justify-center mx-auto mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {likedFoods.map((likedFoods) => (
              <div key={likedFoods.id} className="bg-gray-300 rounded-xl shadow-lg">
                <div className="p-5 flex flex-col">
                  <img
                    src={likedFoods.imageUrl}
                    alt={likedFoods.name}
                    className="rounded-xl overflow-hidden w-full h-48"
                  />
                  <h2 className="text-1xl md:text-3xl font-medium mt-3">
                    {likedFoods.name}
                  </h2>
                  <Link
                    to={`/detailfood/${likedFoods.id}`}
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
      
      {status === "failed" && <div>Error: {error}</div>}
      <Footer />
    </>
  );
};

export default LikedFood;
