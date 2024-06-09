import {
  fetchFail,
  fetchStart,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  addressSucces,
  updateUser,
  followAllSucces,
  followSingleSucces,
  followerSucces,
} from "../features/authSlice";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, access, followAll } = useSelector((store) => store.auth);
  //********************                   *********************** */
  //********************    AUTHOCEIZIN               ************ */
  //********************                   *********************** */
  const register = async (userInfo) => {
    // console.log(userInfo);
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}auth/register`, userInfo);
      //  console.log("register", data);
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
      console.log(data.error == "true", "kontrol et");
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");

      //  console.log(data);
      folgenAll();
      folgenGetSin();
      console.log(followAll, "takip login");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
      toastErrorNotify("Login can not be performed");
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    dispatch(logoutSuccess());
  };

  //********************                   *********************** */
  //********************    PROFILE          ********************* */
  //********************                   *********************** */
  const profile = async () => {
    dispatch(fetchStart());
    //console.log(access, "ACCESSSSSSSS");
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
      // console.log(error.message);
    }
  };

  const profileUpdate = async (userData, address) => {
    //  console.log(user?._id);
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

        // console.log(userResponse.data?.new[0], "TEK UASERR");
        dispatch(updateUser(userResponse.data?.new[0]));
        navigate("/profile");

        const addressResponse = await axios.put(
          `${BASE_URL}address/${user._id}`,
          { address },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        //console.log(addressResponse.data.data, "ADDRESS DATA");
        dispatch(addressSucces(addressResponse.data.data));
      }
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error.message);
    }
  };

  //********************                   *********************** */
  //********************    FOLLOW            ********************* */
  //********************                   *********************** */

  const folgenAll = async () => {
    try {
      if (user?._id) {
        const followResponse = await axios.get(`${BASE_URL}follow`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        // console.log(followResponse);
        dispatch(followAllSucces(followResponse?.data?.data));
        toastSuccessNotify("Follow okey");
      }
    } catch (error) {
      toastErrorNotify(error);
    }
  };
  const folgenSingle = async (id) => {
    try {
      if (user?._id) {
        const data = await axios.post(
          `${BASE_URL}follow/`,
          { followUserId: id },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(data.data);
        toastSuccessNotify("Follow okey");
      }
    } catch (error) {
      toastErrorNotify(error);
    }
  };
  const folgenGetSin = async () => {
    try {
      if (user?._id) {
        const followSing = await axios.get(`${BASE_URL}follow/${user._id}`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        console.log(followSing, "tek olan follow");
        toastSuccessNotify("Follow okey");
        dispatch(followSingleSucces(followSing?.data.allFollows));
      }
    } catch (error) {
      toastErrorNotify(error);
    }
  };
  const followerget = async () => {
    try {
      if (user?._id) {
        const follower = await axios.get(`https://kellerstore.onrender.com/follow/follower`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        console.log(follower, "follower");
        toastSuccessNotify("Follower");
        dispatch(followerSucces(follower?.data.data));
      }
    } catch (error) {
      toastErrorNotify(error);
    }



  };
  return {
    register,
    login,
    logout,
    profile,
    profileUpdate,
    folgenSingle,
    folgenAll,
    folgenGetSin,
    followerget,
  };
};

export default useAuthCall;
