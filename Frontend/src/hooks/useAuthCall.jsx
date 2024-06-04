import {
  fetchFail,
  fetchStart,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  addressSucces,
  updateUser,
} from "../features/authSlice";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, access } = useSelector((store) => store.auth);

  const register = async (userInfo) => {
    console.log(userInfo);
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/register`, userInfo);
      console.log("register", data);
      toastSuccessNotify("Register performed");
      dispatch(registerSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/login/`, userInfo);
      console.log(data, "logindeki");
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify("Login can not be performed");
    }
  };

  const profile = async () => {
    dispatch(fetchStart());
    console.log(access, "ACCESSSSSSSS");

    try {
      if (user?._id) {
        const addressResponse = await axios.get(`${BASE_URL}address/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        // console.log(addressResponse.data.data, "ADDRESS DATA");
        dispatch(addressSucces(addressResponse.data.data));
      }
    } catch (error) {
      dispatch(fetchFail());
      console.log(error.message);
    }
  };

  const profileUpdate = async (userData, address) => {
    console.log(user?._id);

    try {
      if (user?._id) {
        const userResponse = await axios.put(
          `${BASE_URL}users/${user._id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        console.log(userResponse.data?.new[0], "TEK UASERR");
        dispatch(updateUser(userResponse.data?.new[0]));
navigate("/profile")

        const addressResponse = await axios.put(
          `${BASE_URL}address/${user._id}`,
          { address },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        console.log(addressResponse.data.data, "ADDRESS DATA");
        dispatch(addressSucces(addressResponse.data.data));
      }
    } catch (error) {
      dispatch(fetchFail());
      console.log(error.message);
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    dispatch(logoutSuccess());
  };

  return { register, login, logout, profile, profileUpdate };
};

export default useAuthCall;
