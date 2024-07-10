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
  usersSucces
} from "../features/authSlice";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, access, refreshh } = useSelector((store) => store.auth);
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

      //console.log(data);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      // console.log(data.user.isAdmin);
      if (data?.user?.isAdmin == true) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      // folgenAll();
      // folgenGetSin();
      // console.log(followAll, "takip login");
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
      toastErrorNotify("Login can not be performed");
      toastErrorNotify("ilk sira");
    }
  };
  const refresh = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/refresh`, refreshh);
      console.log(data.error == "true", "kontrol et");
      dispatch(loginSuccess(data));
      toastSuccessNotify("refresh");
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
      toastErrorNotify("Refrsh");
    }
  };
  const forgot = async (email) => {
    dispatch(fetchStart());
    console.log(email);
    try {
      await axios.post(`${BASE_URL}auth/forgot`, { email });

      toastSuccessNotify("reset OKEY");
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
      toastErrorNotify("forgot");
    }
  };
  const resetPassword = async (password, token) => {
    dispatch(fetchStart());
    console.log(password);
    try {
      const data = await axios.post(`${BASE_URL}auth/reset`, {
        token: token,
        password: password,
      });
      console.log(data, "resetdeki atalama");
      toastSuccessNotify(data.data.message);
      navigate("/login");
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
      toastErrorNotify("forgot");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    dispatch(logoutSuccess());
  };

  //********************                   *********************** */
  //********************    PROFILE          ********************* */
  //********************                   *********************** */

const userAll = async()=>{
  try {
    
      const userAl = await axios.get(`${BASE_URL}users`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(userAl.data.data,"ggggggggggggg")
      
     dispatch((usersSucces(userAl.data.data)));
    
  } catch (error) {
    dispatch(fetchFail());
    // console.log(error.message);
  }
};





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
      }
    } catch (error) {
      toastErrorNotify(error);
      toastErrorNotify("folgenAll");
    }
  };
  const folgenSingle = async (id) => {
    try {
      if (user?._id) {
        await axios.post(
          `${BASE_URL}follow/`,
          { followUserId: id },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        //console.log(data.data);
        toastSuccessNotify("Follow okey");
      }
    } catch (error) {
      toastErrorNotify(error);
      toastErrorNotify("folgenSingle");
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
        //console.log(followSing, "tek olan follow");

        dispatch(followSingleSucces(followSing?.data.allFollows));
      }
    } catch (error) {
      toastErrorNotify(error);
      toastErrorNotify("folgenGetSin");
    }
  };
  const followerget = async () => {
    try {
      if (user?._id) {
        const follower = await axios.get(
          `https://kellerstore.onrender.com/follow/follower`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        //console.log(follower, "follower");

        dispatch(followerSucces(follower?.data.data));
      }
    } catch (error) {
      toastErrorNotify(error);
      toastErrorNotify("followerget");
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
    refresh,
    forgot,
    resetPassword,
    userAll
  };
};

export default useAuthCall;
