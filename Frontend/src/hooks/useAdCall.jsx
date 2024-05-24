// import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  adSuccess,
  //   messageSuccess,
  //   categoriesSuccess,
} from "../features/adSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAdCall = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getAd = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${BASE_URL}ad/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(data.data);
      dispatch(adSuccess({ data: data.data, url: "ad" }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const deleteAdData = async (url, id) => {
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}${url}/${id}`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      await axiosWithToken.delete(`${url}/${id}`);
      toastSuccessNotify("Operation succes");
      getAd(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };

  const postAdData = async (url, body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${url}/`, body);
      getAd(url);
      toastSuccessNotify("Operation succes");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
      console.log(error);
    }
  };
  const putAdData = async (url, body) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${body._id}`, body);
      getAd(url);
      toastSuccessNotify("Operation succes");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error?.response?.data?.message || "Operation not success"
      );
    }
  };

  return {
    getAd,
    deleteAdData,
    postAdData,
    putAdData,
  };
};

export default useAdCall;
