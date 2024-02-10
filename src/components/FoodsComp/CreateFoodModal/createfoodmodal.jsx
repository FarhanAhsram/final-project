import React from "react";

const CreateFoodModal = ({ isOpen, handleSubmit, foodStatus, toggleModal, fileImageRef }) => {
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
              <form onSubmit={handleSubmit}>
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
                    type="file"
                    ref={fileImageRef}
                    id="imageUrl"
                    name="imageUrl"
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
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  ></textarea>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3E3232] hover:bg-[#503C3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E3232]"
                  >
                    {foodStatus === "loading" ? "Adding..." : "Add Menu"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFoodModal;
