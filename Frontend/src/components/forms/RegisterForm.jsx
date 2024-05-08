import React from "react";
import SubmitButton from "../buttons/SubmitButton";

const RegisterForm = () => {
  return (
    <div className="sm:col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
      <form>
        <div>
          <div>
            <div className="flex items-center gap-x-3 ">
              <div className="flex items-center gap-x-3 border-2 border-gray-300 rounded-md p-1 px-7">
                <input
                  id="privat"
                  name="privat"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="privat"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Privat
                </label>
              </div>
              <div className="flex items-center gap-x-3 border-2 border-gray-300 rounded-md p-1 px-7">
                <input
                  id="gewerblich"
                  name="gewerblich"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="gewerblich"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Gewerblich
                </label>
              </div>
            </div>
            <label
              htmlFor="profileName"
              className="block text-sm font-medium leading-6 text-gray-400"
            ></label>
            <div className="mt-5">
              <input
                id="profileName"
                name="profileName"
                type="profileName"
                autoComplete="profileName"
                placeholder="Profil Name"
                className=" p-3 block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className=" block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <div className="mt-5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="email"
                className=" p-3 block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <div className="mt-5">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                className=" p-3 block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-5">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
