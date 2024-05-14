import React from "react";
import NewAdButton from "../buttons/NewAdButton";
// import { PhotoIcon } from '@heroicons/react/24/solid'
const NewAdForm = () => {
  return (
    <div className="flex justify-center m-5">
      <div className=" bg-background-grey w-2/4 ">
        <form className="m-10 ">
        <div className=' '>
          <div>
            <h4 className="  border-b w-2/4 border-gray-700 text-black text-lg font-semibold m-3">
              Anzeige aufgeben
            </h4>
          </div>

          <div className="w-1/4 flex items-center gap-x-3 border-2 border-white bg-white rounded-md p-1 px-7 mb-4">
            <input
              id="ichbiete"
              name="ichbiete"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <div className=''>
              <label
                htmlFor="ichbiete"
                className=" block  text-sm font-medium leading-6 text-gray-900"
              >
                Ich biete
              </label>
            </div>
          </div>
          <div className="w-1/4 flex items-center gap-x-3 border-2 border-white bg-white  rounded-md p-1 px-7">
            <input
              id="ichsuche"
              name="ichsuche"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="ichsuche"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Ich suche
            </label>
          </div>

          <div className="">
            <label
              htmlFor="Title"
              className=" block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mb-3">
              <input
                id="Title"
                name="Title"
                type="Title"
                autoComplete="Title"
                className=" p-3 block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Wähle deine Kategorie
            </label>
            <div className="relative mt-3">
              <select
                className="  w-2/4 pl-5 pr-3 py-2 text-sm bg-white text-gray-900 shadow-sm rounded-lg duration-200"
                id="grid-state"
              >
                <option>Auto & Rad</option>
                <option>Möbel</option>
                <option>Elektornik</option>
                <option>Haustiere</option>
                <option>Mode</option>
              </select>
            </div>
          </div>

          <label
            htmlFor="Preis"
            className=" block text-sm font-medium leading-6 text-gray-900"
          >
            Preis
          </label>
          <div className="mb-3">
            <input
              id="Preis"
              name="Preis"
              type="Preis"
              autoComplete="Preis"
              className=" p-3 block  w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <label
            htmlFor="Beschreibung"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Beschreibung
          </label>
          <div className="mb-3">
            <input
              id="Beschreibung"
              name="eschreibung"
              type="Beschreibung"
              autoComplete="Beschreibung"
              className=" p-3 block w-2/4  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bilder
            </label>
            <div className=" w-2/4 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Eine Datei hochladen</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only "
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
              <h4 className=" w-2/4 border-b border-gray-700 text-black text-lg font-semibold mb-3">
                Ort
              </h4>
              <label
                htmlFor="PLZ"
                className="mt-3 block text-sm font-medium leading-6 text-gray-900"
              >
                PLZ
              </label>
              <div className="mb-3">
                <input
                  id="PLZ"
                  name="PLZ"
                  type="PLZ"
                  autoComplete="PLZ"
                  className=" p-3 block  w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <label
                htmlFor="Straße/Nr.(Optional)"
                className="mt-3 block text-sm font-medium leading-6 text-gray-900"
              >
                Straße/Nr.(Optional)
              </label>
              <div className="mb-3">
                <input
                  id="Straße/Nr.(Optional)"
                  name="Straße/Nr.(Optional)"
                  type="Straße/Nr.(Optional)"
                  autoComplete="Straße/Nr.(Optional)"
                  className=" p-3 block w-2/4  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <h4 className=" w-2/4 border-b border-gray-700 text-black text-lg font-semibold mb-3">
                Deine Angabe
              </h4>
              <label
                htmlFor="Name"
                className="mt-3  block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mb-3">
                <input
                  id="Name"
                  name="Name"
                  type="Name"
                  autoComplete="Name"
                  className=" p-3 block w-2/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mb-3  ">
              <NewAdButton />
            </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAdForm;
