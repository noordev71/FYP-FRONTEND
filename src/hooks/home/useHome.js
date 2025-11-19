"use client";
import { toast } from "react-toastify";
import { HomeAdapter } from "../../adapter/home.adapter";
import Cookies from "universal-cookie";

const useHome = () => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  const addNewPost = async (platform, formData) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_API_URL, token);
    const response = await homeAdapter.addNewPost(platform, formData);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const getAllAds = async (platform) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_API_URL, token);
    const response = await homeAdapter.getAllAds(platform);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const getDetail = async (platform, id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_API_URL, token);
    const response = await homeAdapter.getAdDetails(platform, id, token);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(loggedError);
      if (response.isAuth) {
        authCtx.validateToken();
      }
      return { ...response, error: loggedError };
    }
    return response;
  };

  const getAllStats = async (platform) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_API_URL, token);
    const response = await homeAdapter.getAllStats(platform);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const updateResponse = async (platform, formData) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_API_URL, token);
    const response = await homeAdapter.updateResponse(platform, formData);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const changeVisibility = async (platform, status, id) => {
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_API_URL, token);
    const response = await homeAdapter.postVisibility(platform, status, id);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  return {
    getAllAds,
    getDetail,
    getAllStats,
    addNewPost,
    updateResponse,
    changeVisibility,
  };
};
export default useHome;
