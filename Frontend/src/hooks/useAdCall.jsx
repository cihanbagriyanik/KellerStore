import { useDispatch, useSelector } from "react-redux";

import {
  fetchFail,
  fetchStart,
  adSuccess,
  neuSucces,
  belibtSucces,
  mostSucces,
  singleSucces,
  //   messageSuccess,
  //   categoriesSuccess,
} from "../features/adSlice";
import useAxios from "./useAxios";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAdCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { access } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getAd = async () => {
    try {
      const { data } = await axiosWithToken(`${BASE_URL}ad`);
      //console.log(data.data);
      const neues = data?.data;
      const reserveControl = neues?.map((item) => {
        if (item.isReserved === true) {
          return { ...item, images: ["animals.png"] };
        }
        return item;
      });

      dispatch(adSuccess(reserveControl));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const neue = async () => {
    try {
      const { data } = await axiosWithToken(`${BASE_URL}ad/neue`);
      // console.log(data?.data.slice(0,10),"neueeeeeeeeeeeeeee")
      const neues = data?.data.slice(0, 4);

      const reserveControl = neues?.map((item) => {
        if (item.isReserved === true) {
          return { ...item, images: ["animals.png"] };
        }
        return item;
      });
      dispatch(neuSucces(reserveControl));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const belibt = async () => {
    try {
      const { data } = await axiosWithToken(`${BASE_URL}favorite/belibt`);
      //console.log(data?.data.slice(0, 10), "belibt");
      const neues = data?.data.slice(0, 4);
      dispatch(belibtSucces(neues));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const most = async () => {
    try {
      const { data } = await axiosWithToken(`${BASE_URL}ad/view`);
      //console.log(data?.data.slice(0, 4), "most");
      const neues = data?.data.slice(0, 4);
      dispatch(mostSucces(neues));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const deleteAdData = async (id) => {
    console.log(id, "ad deleten gelen id");
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}${url}/${id}`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      await axiosWithToken.delete(`${BASE_URL}ad/${id}`);
      toastSuccessNotify("Operation succes");
      getAd();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };

  const postAdData = async (url, body) => {
    dispatch(fetchStart());
    //console.log(body, "postdataaaaaaaaaa");

    try {
      await axiosWithToken.post(`${url}/`, body);
      getAd(url);
      toastSuccessNotify("Operation succes");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };
  const putAdData = async (id, body) => {
    dispatch(fetchStart());
    //console.log(id, body, "putdata guncelememden gele");
    try {
      await axiosWithToken.put(`${BASE_URL}ad/${id}`, body);

      getAd();
      toastSuccessNotify("Operation succes");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };
  const putadReserve = async (id) => {
    //console.log(id, "putdata guncelememden gele");
    try {
      await axiosWithToken.put(`${BASE_URL}ad/reserve/${id}`);
      const { data } = await axiosWithToken(`${BASE_URL}ad`);
      //console.log(data.data);
      const neues = data?.data;
      const reserveControl = neues?.map((item) => {
        if (item.isReserved === true) {
          return { ...item, images: ["animals.png"] };
        }
        return item;
      });

      dispatch(adSuccess(reserveControl));

      toastSuccessNotify("Operation succes");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };
  const single = async (params) => {
    // console.log(params,"getsinle IS")
    try {
      const data = await axios.get(`${BASE_URL}ad/${params}`);
      //console.log(data?.data.son, "tek olan ad");
      dispatch(singleSucces(data?.data?.son));
    } catch (error) {
      toastErrorNotify(error);
    }
  };

  return {
    getAd,
    deleteAdData,
    postAdData,
    putAdData,
    putadReserve,
    neue,
    belibt,
    most,
    single,
  };
};

export default useAdCall;
