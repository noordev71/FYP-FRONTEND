"use client";
import { toast } from "react-toastify";
import { AuthAdapter } from "../../adapter/auth.adapter";
import Cookies from "universal-cookie";

const useAuth = () => {
  const login = async (email, password) => {
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_API_URL);
    const response = await authAdapter.login(email, password);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(response.detailError || loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const register = async (registerData) => {
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_API_URL);
    const response = await authAdapter.register(registerData);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(response.detailError || loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const logout = async () => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const refreshToken = cookie.get("refresh_token");
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_API_URL, token);

    cookie.remove("token", { path: "/", domain: process.env.STORE_COOKIE_URL });
    cookie.remove("refresh_token", {
      path: "/",
      domain: process.env.STORE_COOKIE_URL,
    });
    cookie.remove("name", { path: "/", domain: process.env.STORE_COOKIE_URL });
    cookie.remove("profile_picture", {
      path: "/",
      domain: process.env.STORE_COOKIE_URL,
    });

    const isTokenRemoved = cookie.get("token");

    if (isTokenRemoved !== "" && isTokenRemoved) {
      console.error("Error removing cookies. Could not logout");
      return null;
    }
    const response = await authAdapter.logout(token, refreshToken);

    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(response.detailError || loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const forgetPassword = async (email) => {
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_API_URL);
    const response = await authAdapter.forgetPassword(email);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(response.detailError || loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const resetPassword = async (token, uid, new_password) => {
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_API_URL);
    const response = await authAdapter.resetPassword(token, uid, new_password);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(response.detailError || loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  const otpVerification = async (email, otp) => {
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_API_URL);
    const response = await authAdapter.otpVerification(email, otp);
    if (response.error || response.defaultError) {
      const loggedError = response.error || response.defaultError;
      toast.error(response.detailError || loggedError);
      return { ...response, error: loggedError };
    }
    return response;
  };

  return {
    login,
    resetPassword,
    register,
    forgetPassword,
    logout,
    otpVerification,
  };
};
export default useAuth;
