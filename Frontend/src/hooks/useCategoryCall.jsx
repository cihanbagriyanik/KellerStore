import { useDispatch } from "react-redux";

import { fetchFail, adCategory } from "../features/categorySlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useCategoryCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getCategory = async () => {
    try {
      const { data } = await axiosWithToken(`${BASE_URL}category`);
      console.log(data.data);
      const neues = data?.data;

      dispatch(adCategory(neues));
      toastSuccessNotify("Advertisements fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.response.data.message);
    }
  };

  return {
    getCategory,
  };
};

export default useCategoryCall;
