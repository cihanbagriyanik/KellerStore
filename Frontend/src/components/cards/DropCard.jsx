import React, { useEffect } from "react";

const DropCard = ({ images, setImages }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleRemoveImage = (indexToRemove, image) => {
    console.log(indexToRemove, image, "kontrolllllllllll");
    setImages(images?.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if (images?.length > 5) {
      alert("Lütfen en fazla 5 resim yükleyin");
      setImages(images.slice(0, 5));
    }
  }, []);

  return (
    <div>
      <div>
        <label
          htmlFor="images"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Bilder
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="img"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                resim
              </label>
              <p className="pl-1">oder per Drag & Drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          {console.log(images, "ddddddddddddddddddd")}
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {images?.map((image, index) => (
            <div key={index} className="relative flex items-center mb-2 ">
              <img
                src={`${BASE_URL}images/${image}`}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover mr-2 rounded-full border-2 border-blue-500"
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-15 mr-13 text-red-500"
                onClick={() => handleRemoveImage(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropCard;
