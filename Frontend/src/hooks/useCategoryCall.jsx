import { useDispatch, useSelector } from "react-redux";

import { fetchFail, adCategory,favoriSucces } from "../features/categorySlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import axios from "axios";
const useCategoryCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const { access } = useSelector((state) => state.auth);
  
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
  const favori = async()=>{
    try {
      const { data } = await axiosWithToken(`${BASE_URL}favorite`);
      console.log(data.data);
      const neues = data?.data;

      dispatch(favoriSucces(neues));
      toastSuccessNotify("Advertisements fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.response.data.message);
    }
  }
  const favoriAd= async(id)=>{
     try {
      const data = await axios.post(`${BASE_URL}favorite`,id,{
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
     } catch (error) {
      console.log(error)
     }
  }

  return {
    getCategory,
    favori,favoriAd
  };
};

export default useCategoryCall;
