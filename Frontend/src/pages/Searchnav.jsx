import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchSuccesnav, homecateoriesSucces } from "../features/adSlice";

const Searchnav = () => {
  const [inpt, setInpt] = useState("");
  const dispatch = useDispatch();
  const navi = useNavigate();
//burda async yapisindan dolayi son silinsende inputt armis gibi goyukuyordu bend kisa yoldan boyle yaptim
  const handleChange = (e) => {
    const { value } = e.target;
    setInpt(value);
    if (value?.length > 0) {
      dispatch(homecateoriesSucces(""));
      dispatch(searchSuccesnav(value));
      navi("/allad");
    }
    if (1 > value?.length) {
      dispatch(homecateoriesSucces(""));
      dispatch(searchSuccesnav(""));
      navi("/allad");
    }
  };

  return (
    <div>
      <form className="flex items-center space-x-2 border rounded-md p-2 bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 flex-none text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto bg-gray-100"
          type="text"
          placeholder="Suchen Sie, was immer Sie brauchen"
          style={{ paddingRight: "2rem", width: "36rem" }}
          value={inpt}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Searchnav;
