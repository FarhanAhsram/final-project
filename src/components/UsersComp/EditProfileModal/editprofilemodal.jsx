const EditProfileModal = ({
  isOpen,
  formData,
  handleInputChange,
  handleImage,
  handleSaveEdit,
  handleModalClose,
}) => {
  if (!isOpen) return null;

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, "").slice(0, 13);
    handleInputChange({ target: { name: "phoneNumber", value: phoneNumber } });
  };

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
                Edit User Profile
              </h3>
              <div className="mt-5 sm:mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                />
              </div>
              <div className="mt-5 sm:mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                />
              </div>
              <div className="mt-5 sm:mt-4">
                <label
                  htmlFor="profilePictureUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <img
                  src={formData.profilePictureUrl}
                  alt={formData.name}
                  className="rounded-lg w-1/2 mx-auto mb-2"
                />
                <input
                  type="file"
                  id="profilePictureUrl"
                  name="profilePictureUrl"
                  onChange={handleImage}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                />
              </div>
              <div className="mt-5 sm:mt-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-blue-500 block w-full sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse p-3">
              <button
                onClick={handleSaveEdit}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
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
    </>
  );
};

export default EditProfileModal;
