import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailFood } from "../../../reducer/detailFoodSlice ";
import { fetchFoodLike } from "../../../reducer/foodLikeSlice";
import { fetchFoodUnlike } from "../../../reducer/foodUnlikeSlice";
import { fetchCreateRating } from "../../../reducer/createRatingSlice";
import { fetchGetRating } from "../../../reducer/getRatingSlice";

import Navbar from "../../../components/Navbar/navbar";
import Footer from "../../../components/Footer/footer";
import Loading from "../../../components/Loading/loading";
import GiveRatingModal from "../../../components/FoodsComp/GiveRatingModal/giveratingmodal";
import SeeRatingModal from "../../../components/FoodsComp/SeeRatingModal/seeratingmodal";

const DetailFood = () => {
  const dispatch = useDispatch();

  // Hooks Param Id
  const { id } = useParams();

  // Hooks Selector DetailFood
  const { todo, status, error } = useSelector((state) => state.detailFood);
  const todoData = todo.data || {};

  // Hooks Selector getRatingFood
  const ratings = useSelector((state) => state.getRating.todo.data);
  const statusRate = useSelector((state) => state.getRating.status);
  const errorRate = useSelector((state) => state.getRating.error);

  // Hooks State Rating
  const [rateModal, setRateModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(fetchDetailFood(id));
    dispatch(fetchGetRating(id));
  }, [dispatch, id]);

  const handleInputRating = (e) => {
    setRating(Number(e.target.value));
  };

  const handleInputReview = (e) => {
    setReview(e.target.value);
  };

  const handleModalClose = () => {
    setRateModal(false);
    setReviewModal(false);
  };

  // Function Create Rating
  const handleRatingSubmit = () => {
    try {
      const ratingData = {
        rating,
        review,
      };
      dispatch(fetchCreateRating({ id, ratingData }));
      setRateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Function Give Food Like
  const handleLikeFood = () => {
    const foodId = id;
    dispatch(fetchFoodLike({ foodId }));
  };

  // Function Give Food Unlike
  const handleUnlikeFood = () => {
    const foodId = id;
    dispatch(fetchFoodUnlike({ foodId }));
  };

  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />

      {status === "loading" && <Loading />}

      <h1 className="text-4xl font-semibold font-cursive text-center mt-10 mb-4">
        Food's Detail
      </h1>

      <div className="flex flex-col md:flex-row max-w-3x1 p-5">
        {/* Images */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            className="rounded-lg shadow-xl w-full max-w-lg max-h-96 mx-auto"
            src={todoData.imageUrl}
            alt={todoData.name}
          />
        </div>

        {/* Detail */}
        <div className="md:w-1/2 mx-auto">
          <h1 className="text-2xl font-semibold mb-2">{todoData.name}</h1>
          <p className="text-gray-600">{todoData.description}</p>

          <div className="md:mx-auto flex gap-8">
            <button
              onClick={handleLikeFood}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </button>

            <button
              onClick={handleUnlikeFood}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                />
              </svg>
            </button>
          </div>

          <div>
            <button
              onClick={() => setRateModal(true)}
              className="w-full mt-4 bg-[#3F2E3E] hover:bg-[#7E6363] text-white font-bold py-2 px-4 rounded-xl"
            >
              Give Rating
            </button>
          </div>

          <div>
            <button
              onClick={() => setReviewModal(true)}
              className="w-full mt-4 bg-[#3F2E3E] hover:bg-[#7E6363] text-white font-bold py-2 px-4 rounded-xl"
            >
              See Rating
            </button>
          </div>
        </div>
      </div>

      <GiveRatingModal
        isOpen={rateModal}
        rating={rating}
        review={review}
        handleInputRating={handleInputRating}
        handleInputReview={handleInputReview}
        handleRatingSubmit={handleRatingSubmit}
        handleModalClose={handleModalClose}
      />

      <SeeRatingModal
        isOpen={reviewModal}
        ratings={ratings}
        statusRate={statusRate}
        handleModalClose={handleModalClose}
      />

      <Footer />
    </div>
  );
};

export default DetailFood;
