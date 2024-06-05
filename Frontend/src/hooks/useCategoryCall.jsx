import { useDispatch, useSelector } from "react-redux";

import { fetchFail, adCategory,favoriSucces, singleUser } from "../features/categorySlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import axios from "axios";

const useCategoryCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const { access } = useSelector((state) => state.auth);
  const {favoriAd} =useSelector(state=>state.category)
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
  const favoriAdd= async(id)=>{
     try {
      await axios.post(`${BASE_URL}favorite`,{adId:id},{
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
     toastSuccessNotify("update LIKE")
     } catch (error) {
      console.log(error)
      toastErrorNotify(error.response.data.message);
     }
  };
  //burda giren kullanicin gelen favoride bakarak o kullanicin favori yaptigi push ettim
  const favoriAll = async () => {
    try {
      const data=  await axios.get(`${BASE_URL}favorite/user`,{
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      console.log(data,"FAVORI USER")
      dispatch(singleUser(data.data));
     } catch (error) {
      console.log(error)
      toastErrorNotify(error.response.data.message);
     }
 
  };
  return {
    getCategory,
    favori,favoriAdd,favoriAll
  };
};

export default useCategoryCall;
