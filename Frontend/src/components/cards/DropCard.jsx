import { useEffect } from "react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropCard = ({ images, setImages }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles, "Accepted files");
      // Yeni yüklenen dosyaları mevcut resim listesine eklemeeeeeeeee
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file), // Dosyadan bir URL oluştur n=buna dikkat gostermek icin
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    },
    [setImages]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  console.log(images, "bir bakbakalim");
  const handleRemoveImage = (indexToRemove, image) => {
    // console.log(indexToRemove, image, "kontrolllllllllll");
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
            <div key={index} className="relative flex items-center mb-2 ">
              <img
                src={image.preview || `${BASE_URL}images/${image}`}
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
