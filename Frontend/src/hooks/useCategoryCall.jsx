import { useDispatch, useSelector } from "react-redux";

import { fetchFail, adCategory,favoriSucces, singleUser } from "../features/categorySlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import axios from "axios";
import { useState } from "react";
const useCategoryCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const { access,user } = useSelector((state) => state.auth);
  const {favoriAd} =useSelector(state=>state.category)
  const dispatch = useDispatch();
  const [favcount, setFavcount] = useState(new Set());

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
  const favoriAll = async (id) => {
    
    console.log(id,"favoriall")
    try {
      if (user?._id) {  // Eğer user ve user._id varsa
        //burda kritik hat aldim slice degeri kullandigim gecikme oliuor ve hata 
        
        const { data } = await axiosWithToken(`${BASE_URL}favorite`);
        const newFavs = new Set(favcount); // Mevcut favorileri yeni bir Set'e kopyala
        data.data?.forEach((dertItem) => {
          dertItem?.favorites.forEach((item) => {
            if (item === user._id) {
              newFavs.add(dertItem.adId); // Benzersiz adId'leri ekle
            }
          });
        });
        setFavcount(newFavs); // Yeni Set'i state'e ata
      }
      console.log([...favcount], "favcount");
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
