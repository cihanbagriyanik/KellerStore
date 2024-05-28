import { useState, useEffect } from "react";
import NewAdFormButton from "../buttons/NewAdFormButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewAdForm = () => {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({
    offerType: "",
    title: "",
    categoryName: "",
    subCategoryName: "",
    price: "",
    content: "",
    plz: "",
    straße: "",
  });

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const selectedCategory = category.find(
      (cat) => cat.categoryName === formValues.categoryName
    );
    if (selectedCategory) {
      setSubCategories(selectedCategory.subcategories);
    } else {
      setSubCategories([]);
    }
  }, [formValues.categoryName, category]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handlef = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages([...images, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("offerType", formValues.offerType);
    formData.append("title", formValues.title);
    formData.append("categoryId", "611dc37f60ae434ae87a13a3");
    formData.append("price", Number(formValues.price));
    formData.append("content", formValues.content);
    formData.append("plz", formValues.plz);
    formData.append("straße", formValues.straße);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("userId", user._id);

    try {
      const response = await axios.post(
        "https://kellerstore.onrender.com/ad",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="border w-full m-10 bg-light-grey pb-7 rounded-lg flex justify-center items-center">
      <div className="w-2/4 m-5 bg-white rounded-lg flex justify-center items-center pt-3 pb-3">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <h4 className="text-xl mb-5 border-b-2 border-button-blue text-button-blue">
              Anzeige aufgeben
            </h4>
            <div>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-3 border-2 border-gray-300 rounded-md p-1 px-7">
                  <input
                    id="offer"
                    name="offerType"
                    type="radio"
                    value="offer"
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="offer"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ich biete
                  </label>
                </div>
                <div className="flex items-center gap-x-3 border-2 border-gray-300 rounded-md p-1 px-7">
                  <input
                    id="looking"
                    name="offerType"
                    type="radio"
                    value="looking"
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="looking"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ich suche
                  </label>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mb-3">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    value={formValues.title}
                    onChange={handleChange}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Wähle deine Kategorie
                </label>
                <div className="relative mt-3">
                  <select
                    className="w-full pl-5 pr-3 py-2 text-sm bg-white text-gray-900 shadow-sm rounded-lg duration-200"
                    id="category"
                    name="categoryName"
                    value={formValues.categoryName}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {category?.map((item, index) => (
                      <option key={index} value={item.categoryName} onClick={()=>console.log(item._id,"category")}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {subCategories.length > 0 && (
                <div>
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-medium leading-6 text-gray-900 mt-3"
                  >
                    Wähle deine Unterkategorie
                  </label>
                  <div className="relative mt-3">
                    <select
                      className="w-full pl-5 pr-3 py-2 text-sm bg-white text-gray-900 shadow-sm rounded-lg duration-200"
                      id="subCategory"
                      name="subCategoryName"
                      value={formValues.subCategoryName}
                      onChange={handleChange}
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((sub, index) => (
                        <option key={index} value={sub.name} onClick={()=>console.log(sub._id,"SUBcategory")}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900 mt-3"
              >
                Preis
              </label>
              <div className="mb-3">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  value={formValues.price}
                  onChange={handleChange}
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Beschreibung
            </label>
            <div className="mb-3">
              <input
                id="content"
                name="content"
                type="text"
                autoComplete="content"
                value={formValues.content}
                onChange={handleChange}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
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
            </div>

            <div>
              <div>
                <h4 className="text-xl mb-5 border-b-2 border-button-blue text-button-blue">
                  Ort
                </h4>
                <label
                  htmlFor="plz"
                  className="mt-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  PLZ
                </label>
                <div className="mb-3">
                  <input
                    id="plz"
                    name="plz"
                    type="text"
                    value={formValues.plz}
                    onChange={handleChange}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="straße"
                  className="mt-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Straße
                </label>
                <div className="mb-3">
                  <input
                    id="straße"
                    name="straße"
                    type="text"
                    value={formValues.straße}
                    onChange={handleChange}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <NewAdFormButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdForm;
