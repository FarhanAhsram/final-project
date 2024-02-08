const SeeRatingModal = ({ isOpen, statusRate, ratings, handleModalClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
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
    </>
  );
};

export default SeeRatingModal;
