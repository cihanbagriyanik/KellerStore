import { useParams } from "react-router-dom";
import useAuthCall from "../../hooks/useAuthCall";
import { useState } from "react";

const ResetForm = () => {
  const { resetPassword } = useAuthCall();
  const { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState("");
  console.log(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password, "icedeki consollll");
    console.log(password, "icedeki consollll");
    await resetPassword(password,token);
  };

  return (
    <div>
      <h4 className=" text-blue-600 text-3xl font-semibold text-center">
        Willkommen bei KelerStore!
      </h4>
      <div className="sm:col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-3">
        <div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="m-5 mx-40">
            <button
              className="btn bg-twitter-button-blue border border-0.5 border-button-blue hover:border-button-orange"
              type="submit"
              onClick={handleSubmit}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
