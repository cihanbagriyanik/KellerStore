import { useState, useEffect } from "react";
import NewAdFormButton from "../buttons/NewAdFormButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropCard from "../cards/DropCard";

const NewAdForm = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({
    offerType: "",
    title: "",
    categoryId: "",
    subCategoryId: "",
    price: "",
    content: "",
    zipCode: "",
    street: "",
  });
  // console.log(formValues);

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const selectedCategory = category.find(
      (cat) => cat._id === formValues.categoryId
    );
    if (selectedCategory) {
      setSubCategories(selectedCategory.subcategories);
    } else {
      setSubCategories([]);
    }
  }, [formValues.categoryId, category]);

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
  console.log(images);

  const kontrol = () => {
    const handleRemoveImage = (indexToRemove) => {
      setImages(images.filter((_, index) => index !== indexToRemove));
    };

    if (images.length > 5) {
      alert("Lütfen en fazla 5 resim yükleyin");

      return images.map((item, index) => (
        <div key={index} className="flex items-center">
          <span>{item.name}</span>
          <button
            type="button"
            className="ml-2 text-red-500"
            onClick={() => handleRemoveImage(index)}
          >
            x
          </button>
        </div>
      ));
    }

    return images.map((item, index) => (
      <div key={index} className="flex items-center">
        <span>{item.name}</span>
        <button
          type="button"
          className="ml-2 text-red-500"
          onClick={() => handleRemoveImage(index)}
        >
          x
        </button>
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("offerType", formValues.offerType);
    formData.append("title", formValues.title);
    formData.append("categoryId", formValues.categoryId);
    formData.append("subCategoryId", formValues.subCategoryId);
    formData.append("price", Number(formValues.price));
    formData.append("content", formValues.content);
    formData.append("zipCode", formValues.zipCode);
    formData.append("street", formValues.street);
    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      } else {
        formData.append("images", image.path); // var olan resimler
      }
    });

    formData.append("userId", user._id);
    // console.log(formData, "formData");
    try {
      const data = await axios.post(`${BASE_URL}ad`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      console.log(data, "eklemede");
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
                    name="categoryId"
                    value={formValues.categoryId}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {category?.map((item, index) => (
                      <option key={index} value={item._id}>
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
                      name="subCategoryId"
                      value={formValues.subCategoryId}
                      onChange={handleChange}
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((sub, index) => (
                        <option key={index} value={sub._id}>
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
              <DropCard images={images} setImages={setImages} />
            </div>

            <div>
              <div>
                <h4 className="text-xl mb-5 border-b-2 border-button-blue text-button-blue">
                  Ort
                </h4>
                <label
                  htmlFor="zipCode"
                  className="mt-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  PLZ
                </label>
                <div className="mb-3">
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formValues.zipCode}
                    onChange={handleChange}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="street"
                  className="mt-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Straße
                </label>
                <div className="mb-3">
                  <input
                    id="street"
                    name="street"
                    type="text"
                    value={formValues.street}
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
