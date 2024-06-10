import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { messageSuccess } from "../features/adSlice";

const useMesaj = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {  access } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mesajPost = async (data) => {
    const { adId, message } = data; 
    console.log(adId, message, "messagePOST");

    try {
   
        const mesaj = await axios.post(
          `${BASE_URL}messages`,
          { adId, message },

          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(mesaj?.data);
        dispatch(messageSuccess(mesaj));
      
      toastSuccessNotify("Follow okey");
    } catch (error) {
      toastErrorNotify(error);
      // console.log(error.message);
    }
  };

  return {
    mesajPost,
  };
};

export default useMesaj;
