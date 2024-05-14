import React from "react";
import LoginButton from "../buttons/LoginButton";

const LoginForm = () => {
  return (
    <div>
    <h4 className=" text-blue-600 text-3xl font-semibold text-center">Willkommen
bei KelerStore!</h4>
    <div className="sm:col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
    
      <form>
        <div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
             
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
             
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="m-5">
            <LoginButton />
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
