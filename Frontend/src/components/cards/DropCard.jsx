


const DropCard = ({images,setImages}) => {
    
    const handlef = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages([...images, ...newFiles]);
      };
  return (
    <div> <div>
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
            <span>Eine Datei hochladen</span>
            <input
              id="img"
              name="images"
              type="file"
              className="sr-only"
              accept="image/*"
              multiple
              onChange={handlef}
            />
          </label>
          <p className="pl-1">oder per Drag & Drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  </div></div>
  )
}

export default DropCard