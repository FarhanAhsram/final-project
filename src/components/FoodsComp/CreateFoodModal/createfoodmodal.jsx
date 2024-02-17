import React from "react";

const CreateFoodModal = ({
  isOpen,
  handleChange,
  handleImage,
  handleSubmit,
  foodStatus,
  toggleModal,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-[#3E3232] opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-[#EFE1D1] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-[#EFE1D1] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3
                className="text-2xl leading-6 font-medium text-gray-900 text-center"
                id="modal-headline"
              >
                Create Food
              </h3>
              <form>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleImage}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="ingredients"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Ingredients
                  </label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  ></textarea>
                </div>
              </form>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse p-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {foodStatus === "loading" ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFoodModal;
