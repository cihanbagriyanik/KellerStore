import { useDispatch, useSelector } from "react-redux";

import { fetchFail, adCategory,favoriSucces, singleUser } from "../features/categorySlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import axios from "axios";
const useCategoryCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const { access,user } = useSelector((state) => state.auth);
  const {favoriAd,favoriUser} =useSelector(state=>state.category)
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
      const data = await axios.post(`${BASE_URL}favorite`,{adId:id},{
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      console.log(data,"favoriadddddd")
     } catch (error) {
      console.log(error)
     }
  }
  //burda giren kullanicin gelen favoride bakarak o kullanicin favori yaptigi push ettim
  const favoriAll = async () => {
    console.log("calisti")
    try {
      if (user?._id) {  // Eğer user ve user._id varsa
        favoriAd?.forEach((dertItem) => {  // favoriAd listesindeki her bir öğeyi geziyoruz
          dertItem?.favorites.forEach((item) => {  // dertItem içindeki favorites listesindeki her bir öğeyi geziyoruz
            if (item === user._id) {  // Eğer favorites listesindeki öğe user._id'ye eşitse
              dispatch(singleUser(dertItem.adId));  // dert dizisine dertItem'in adId'sini ekliyoruz
            }
          });
        });
      }
    } catch (error) {
      toastErrorNotify(error);
    }
  };
  return {
    getCategory,
    favori,favoriAdd,favoriAll
  };
};

export default useCategoryCall;
