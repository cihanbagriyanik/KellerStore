import { useEffect } from "react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropCard = ({ images, setImages }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prevImages) => {
        // Yüklenen toplam resim sayısının beşi geçmemesi için kontrol
        if (prevImages.length + newImages.length > 5) {
          alert("Lütfen en fazla 5 resim yükleyin");
          return prevImages;
        }
        return [...prevImages, ...newImages];
      });
    },
    [setImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label
        htmlFor="images"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Bilder
      </label>
      <div {...getRootProps()}>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {images?.map((image, index) => (
          <div key={index} className="relative flex items-center mb-2">
            <img
              src={image.preview || `${BASE_URL}images/${image.path || image}`}
              alt={`preview-${index}`}
              className="w-20 h-20 object-cover mr-2 rounded-full border-2 border-blue-500"
            />
            <button
              type="button"
              className="absolute top-0 right-0 mt-1 mr-1 text-red-500"
              onClick={() => handleRemoveImage(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropCard;
