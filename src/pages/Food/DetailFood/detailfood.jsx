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

  // Variable untuk DetailFood
  const { todo, status, error } = useSelector((state) => state.detailFood);
  const { id } = useParams();
  const todoData = todo.data || {};

  // Variable untuk getRatingFood
  const ratings = useSelector((state) => state.getRating.todo.data);
  const statusRate = useSelector((state) => state.getRating.status);
  const errorRate = useSelector((state) => state.getRating.error);

  // Variable untuk Rating
  const [rateModal, setRateModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(fetchDetailFood(id));
    dispatch(fetchGetRating(id));
  }, [dispatch, id]);

  // Function untuk Input Value Rate
  const handleInputRating = (e) => {
    setRating(Number(e.target.value));
  };

  // Function untuk Input Value Review
  const handleInputReview = (e) => {
    setReview(e.target.value);
  };

  // Function untuk Create Submit
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

  // Funtion untuk tutup modal Rating
  const handleModalClose = () => {
    setRateModal(false);
    setReviewModal(false);
  };
  
  const handleLikeFood = () => {
    dispatch(fetchFoodLike(id));
  };

  const handleUnlikeFood = () => {
    dispatch(fetchFoodUnlike(id));
  };

  return (
    <div className="bg-[#EFE1D1]">
      <Navbar />

      {status === "loading" && <Loading />}

      <h1 className="text-4xl font-semibold text-center mt-10 mb-4">
        Food's Detail
      </h1>

      <div className="flex flex-col md:flex-row max-w-3x1 p-5">
        {/* Images */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            className="rounded-lg shadow-md w-full max-w-lg max-h-96 mx-auto"
            src={todoData.imageUrl}
            alt={todoData.name}
          />
        </div>

        {/* Detail */}
        <div className="md:w-1/2 mx-auto">
          <h1 className="text-xl font-semibold mb-2">{todoData.name}</h1>
          <p className="text-gray-600">{todoData.description}</p>

          <div className="flex gap-8">
            <button
              onClick={handleLikeFood}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Like Food
            </button>
            <button
              onClick={handleUnlikeFood}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Unlike Food
            </button>

            <button
              onClick={() => setRateModal(true)}
              className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Give Rating
            </button>
            <button
              onClick={() => setReviewModal(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

      {/* Modal Give Rating */}
      {/* {rateModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-2xl leading-6 font-medium text-gray-900 text-center"
                  id="modal-headline"
                >
                  Rating Food
                </h3>
                <div className="mt-5 sm:mt-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="0"
                    max="5"
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                  />
                </div>
                <div className="mt-5 sm:mt-4">
                  <label
                    htmlFor="job"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Review
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="4"
                    cols="50"
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse p-3">
                <button
                  onClick={handleRatingSubmit}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit Rating
                </button>
                <button
                  onClick={handleModalClose}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Modal Review Food */}
      {/* {reviewModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-2xl leading-6 font-medium text-gray-900 text-center"
                  id="modal-headline"
                >
                  Food's Rating and Review
                </h3>
                {statusRate === "succeeded" && ratings && (
                  <div className="mt-6">
                    {ratings.map((getRate) => (
                      <div
                        key={getRate.id}
                        className="rounded-xl bg-slate-300 p-2 mt-4"
                      >
                        <h1 className="font-bold">{getRate.user.name}</h1>
                        <h1>Rating: {getRate.rating}</h1>
                        <h1>Review: {getRate.review}</h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="sm:flex sm:flex-row-reverse p-3">
                <button
                  onClick={handleModalClose}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <Footer />
    </div>
  );
};

export default DetailFood;
