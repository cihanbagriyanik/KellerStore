import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { messageSuccess } from "../features/mesajSlice";

const useMesaj = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { access } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const mesajPost = async (data) => {
    const { adId, message } = data;
    // console.log(adId, message, "messagePOST");

    try {
      await axios.post(
        `${BASE_URL}messages`,
        { adId, message },

        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      //console.log(mesaj?.data);

      toastSuccessNotify("Mesaj Sended");
      mesajGet();
    } catch (error) {
      toastErrorNotify(error);
      // console.log(error.message);
    }
  };

  const mesajGet = async () => {
    try {
      const mesaj = await axios.get(
        `${BASE_URL}messages`,

        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      // console.log(mesaj?.data.data);
      const dat = mesaj?.data.data;
      dispatch(messageSuccess(dat));
    } catch (error) {
      toastErrorNotify(error);
      // console.log(error.message);
    }
  };
  const mesajRead = async (id) => {
   // console.log(id);
    try {
      const mesajRead = await axios.get(
        `${BASE_URL}messages/${id}`,

        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
     // console.log(mesajRead?.data.data);
      const dat = mesajRead?.data.data;
      dispatch(messageSuccess(dat));
    } catch (error) {
      toastErrorNotify(error);
      // console.log(error.message);
    }
  };

  return {
    mesajPost,
    mesajGet,
    mesajRead,
  };
};

export default useMesaj;
